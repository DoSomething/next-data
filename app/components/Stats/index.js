import React from 'react';
import Keen from 'keen-js';
import Chart from '../Chart';
import AdvancedChart from '../Chart/Advanced';
import * as _filters from './filters';

const Stat = ({ config, globals }) => {
  if (!config.queries) return null;

  const { render } = config;
  const postProcess = config.postProcess || (res) => res;

  const queryBuilder = (options) => {
    const queryType = options.queryType || 'count';
    const formattedOptions = {
      eventCollection: options.eventCollection || 'action',
    };

    delete options.queryType;
    delete options.eventCollection;

    const applyProps = (obj) => {
      const props = Object.keys(obj);

      for (const propKey of Object.keys(props)) {
        if (formattedOptions[propKey] && Array.isArray(formattedOptions[propKey])) {
          formattedOptions[propKey] = [
            ...formattedOptions[propKey],
            ...(Array.isArray(props[propKey]) ? props[propKey] : [props[propKey]]),
          ];
        } else {
          formattedOptions[propKey] = props[propKey];
        }
      }
    }

    applyProps(globals);
    applyProps(options);

    return new Keen.Query(queryType, formattedOptions);
  };

  const queries = config.queries.map(queryBuilder);

  if (!queries) return null;

  if (queries.length > 1) {
    return ( <AdvancedChart queries={queries} options={render} postProcess={postProcess} /> );
  } else {
    return ( <Chart query={queries[0]} options={render} /> );
  }
};

Stat.defaultProps = {
  config: {
    queries: [],
    render: {
      title: '',
      chartType: 'metrics',
      height: null,
    },
    postProcess: null,
  },
  globals: {
    timeframe: 'previous_7_days',
    filters: [],
  }
}

export default Stat;
