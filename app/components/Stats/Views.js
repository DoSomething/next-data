import React from 'react';
import Keen from 'keen-js';
import Chart from '../Chart';
import { totalViews, authenticated, affiliated, campaign } from './filters';

const Views = ({ queryOptions, configuration }) => {
  const { timeframe, interval, campaignId } = queryOptions;
  const { title, onlyAuthenticated, onlyAffiliated, unique } = configuration;

  const filters = [totalViews];

  if (onlyAuthenticated) filters.push(authenticated);

  if (onlyAffiliated) filters.push(affiliated);

  if (campaignId) filters.push(campaign(campaignId));

  const queryType = unique ? 'count_unique' : 'count';
  const targetProperty = unique ? 'user.session.id' : null;

  const query = new Keen.Query(queryType, {
    eventCollection: 'action',
    timeframe,
    interval,
    targetProperty,
    filters,
  });

  return (
    <Chart query={query} options={{ title }}/>
  );
};

export default Views;
