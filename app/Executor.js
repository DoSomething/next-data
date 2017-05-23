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
      return ((a / b) * 100).toFixed(2);
    case 'add':
      return computation.values.reduce((acc, val) => {
        return acc + row[val];
      }, 0);
  }
}

function updateProgressBar(index, total) {
  document.getElementById('dashboard').textContent = `running... (${index + 1}/${total})`;
}

export default async function execute(client, campaignId, queries) {
  const campaignFilter = campaignId ? new CampaignFilter(campaignId) : null;
  const data = [{ group: 'overall' }];
  const fields = ['group'];

  const WEEK = 6048e5;
  const totalCohorts = Math.ceil((new Date().getTime() - INCEPTION.getTime()) / WEEK);

  // TODO: Make this attach to a loader bar
  const totalQueries = queries.reduce((acc, val) => {
    acc++;
    if (! val.skipCohort) acc += totalCohorts;
    return acc;
  }, 0);
  let queryIndex = 0;

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

    updateProgressBar(queryIndex++, totalQueries);
    data[0][column] = result;
  }

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

      updateProgressBar(queryIndex++, totalQueries);
      row[column] = result;
    }

    data.push(row);
  }

  return { data, fields };
};
