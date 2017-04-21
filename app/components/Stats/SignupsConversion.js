import React from 'react';
import Keen from 'keen-js';
import AdvancedChart from '../Chart/Advanced';
import {
  totalViews,
  notAffiliated,
  campaign,
  signup,
  scholarshipsPage,
  faqPage,
  actionPage,
  communityPage,
} from './filters';

const pages = [
  {
    category: 'all pages',
  },
  {
    category: 'scholarships page',
    filter: scholarshipsPage
  },
  {
    category: 'faq page',
    filter: faqPage,
  },
  {
    category: 'action page',
    filter: actionPage,
  },
  {
    category: 'community page',
    filter: communityPage,
  }
];

const SignupsConversion = ({ queryOptions, configuration }) => {
  const { timeframe, interval, campaignId } = queryOptions;
  const { title, height, comparePages, adjustForTraffic } = configuration;

  const queries = [];

  function getSignupsQuery(extraFilter) {
    const filters = [signup];

    if (extraFilter) filters.push(...extraFilter);
    if (campaignId) filters.push(campaign(campaignId));

    const signupsQuery = new Keen.Query('count', {
      eventCollection: 'action',
      timeframe,
      interval,
      filters,
    });
    queries.push(signupsQuery);
  }

  function getSessionQuery(extraFilter) {
    const filters = [notAffiliated];

    if (extraFilter) filters.push(...extraFilter);
    if (campaignId) filters.push(campaign(campaignId));

    const sessionsQuery = new Keen.Query('count_unique', {
      eventCollection: 'action',
      timeframe,
      interval,
      targetProperty: 'user.session.id',
      filters,
    });
    queries.push(sessionsQuery);
  }

  let totalQueries = 1;
  let range = [0, totalQueries];
  if (comparePages) {
    totalQueries = pages.length;
    range[0] = 1;
    range[1] = totalQueries - 1;
  }

  const queryGetters = [getSignupsQuery, getSessionQuery];

  for (const get of queryGetters) {
    for (var i = 0; i < totalQueries; i++) {
      const filter = pages[i].filter;
      const param = Array.isArray(filter) ? filter : [filter];

      filter ? get(param) : get();
    }
  }

  const renderOptions = {
    title,
    chartType: 'linechart',
    height,
  };

  const calculatePercent = (res) => {
    const signups = res.splice(0, totalQueries);
    const views = res;
    const iterator = signups[0].result;
    const data = [];

    for (let intervalIndex = 0; intervalIndex < iterator.length; intervalIndex++) {
      for (let bucketIndex = 0; bucketIndex < totalQueries; bucketIndex++) {
        const signup = signups[bucketIndex].result[intervalIndex];
        const interval = data[intervalIndex] || {
          timeframe: signup.timeframe,
          value: [],
        };

        const view = views[bucketIndex].result[intervalIndex];
        const result = (signup.value / view.value).toFixed(2) * 100;

        interval.value[bucketIndex] = {
          category: pages[bucketIndex].category,
          result,
        };
        data[intervalIndex] = interval;
      }
    }

    return data;
  };

  const calculateRelative = (res) => {
    function getTotal({ result }) {
      let total = 0;
      for (const { value } of result) total += value;
      return total;
    }

    const signupTotal = getTotal(signups[0]);
    const sessionTotal = getTotal(sessions[0]);

    for (let intervalIndex = 0; intervalIndex < iterator.length; intervalIndex++) {
      for (let bucketIndex = 0; bucketIndex < signups.length; bucketIndex++) {
        const signup = signups[bucketIndex].result[intervalIndex];
        const interval = data[intervalIndex] || {
          timeframe: signup.timeframe,
          value: [],
        };

        const session = sessions[bucketIndex].result[intervalIndex];

        const signupResult = signup.value / signupTotal;
        const sessionResult = session.value / sessionTotal;
        const result = signupResult / sessionResult;

        interval.value[bucketIndex] = {
          category: pages[bucketIndex].category,
          result,
        };
        data[intervalIndex] = interval;
      }
    }

    return data;
  }

  const postProcess = (res) => {
    return adjustForTraffic ? calculateRelative(res) : calculatePercent(res);
  }

  return (
    <AdvancedChart
      queries={queries}
      options={renderOptions}
      postProcess={postProcess} />
  );
};

export default SignupsConversion;
