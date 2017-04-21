import React from 'react';
import Keen from 'keen-js';
import Chart from '../Chart';
import { signup, campaign } from './filters';

const Signups = ({ queryOptions, configuration }) => {
  const { timeframe, interval, campaignId } = queryOptions;
  const { title, shouldGroupBy, height } = configuration;

  let group_by = null;
  if (shouldGroupBy === 'source') group_by = 'page.path';
  else if (shouldGroupBy === 'referer') group_by = 'page.referer';

  const filters = [signup];

  if (campaignId) filters.push(campaign(campaignId));

  const query = new Keen.Query('count', {
    eventCollection: 'action',
    timeframe,
    filters,
    group_by
  });

  const renderOptions = {
    title,
    height,
    chartType: shouldGroupBy ? 'piechart' : 'metric',
  };

  return (
    <Chart query={query} options={renderOptions}/>
  );
};

export default Signups;
