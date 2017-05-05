import CampaignFilter from './filters/CampaignFilter';
import { INCEPTION, makeStat } from './helpers';

function standardizeQuery(query, campaignFilter, timeframe) {
  if (campaignFilter) query.addFilter(campaignFilter);
  if (timeframe) query.setTimeframe(timeframe);
}

function runComputation(computation, row) {
  switch (computation.operation) {
    case 'divide':
      const a = row[computation.values[0]];
      const b = row[computation.values[1]];
      return (a / b).toFixed(2) * 100;
      return Math.round((a / b).toFixed(2) * 100)
  }
}

export default async function execute(client, campaignId, queries) {
  const campaignFilter = campaignId ? new CampaignFilter(campaignId) : null;
  const data = [{ group: 'overall' }];
  const fields = ['group'];

  // Calculate for overall
  for (const config of queries) {
    const { Query, options, column, computation } = config;
    if (!fields.includes(column)) fields.push(column);

    let result = null;

    if (computation) {
      result = runComputation(config, data[0]);
    } else {
      const query = new Query(client, options);
      standardizeQuery(query, campaignFilter);

      result = await query.perform();
    }

    data[0][column] = result;
  }

  const WEEK = 6048e5;
  const totalCohorts = Math.ceil((new Date().getTime() - INCEPTION.getTime()) / WEEK);

  // Calculate per cohort
  for (let cohortIndex = 0; cohortIndex < totalCohorts; cohortIndex++) {
    const startTime = INCEPTION.getTime() + (cohortIndex * WEEK);
    const endTime = startTime + (WEEK - 1);

    const start = new Date(startTime);
    const end = new Date(endTime);

    const row = { group: `${start.toString()}-${end.toString()}` };

    for (const config of queries) {
      const { Query, options, column, computation, skipCohort } = config;

      if (skipCohort) continue;

      let result = null;

      if (computation) {
        result = runComputation(config, row);
      } else {
        const query = new Query(client, options);
        standardizeQuery(query, campaignFilter, { start, end });

        result = await query.perform();
      }

      row[column] = result;
    }

    if (Object.keys(row) > 1) data.push(row);
  }

  return { data, fields };
};
