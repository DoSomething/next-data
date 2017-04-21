import React from 'react';
import Keen from 'keen-js';
import Chart from '../Chart';
import { authenticated, affiliated, campaign } from './filters';

const Sessions = ({ queryOptions, configuration }) => {
  const { timeframe, interval, campaignId } = queryOptions;
  const { title, onlyAuthenticated, onlyAffiliated } = configuration;

  const filters = [];

  if (onlyAuthenticated) filters.push(authenticated);

  if (onlyAffiliated) filters.push(affiliated);

  if (campaignId) filters.push(campaign(campaignId));

  const targetProperty = 'user.session.id';

  const query = new Keen.Query('count_unique', {
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

export default Sessions;
