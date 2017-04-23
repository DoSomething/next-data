const console = require('keypunch');
const Keen = require('keen-js');
const Filters = require('../keen/Filters');
const Queries = require('../keen/Queries');
// const Cohorts = require('../keen/Cohorts');

/**
 * Make a dashboard using the given client
 * and optional campaign filter.
 *
 * @param  {Keen}    client
 * @param  {Array}   fields
 * @param  {String}  campaignId
 * @return {Promise}
 */
async function run(client, fields, campaignId) {
  console.info(`Calculating dashboard for ${campaignId || 'all campaigns'}`);

  fields.unshift('group');
  const data = [];
  const overall = { group: 'overall' };

  function makeFilters(filters) {
    if (!filters) filters = [];
    if (!Array.isArray(filters)) filters = [filters];
    if (!campaignId) return filters;
    return [...filters, Filters.campaign(campaignId)];
  }

  function standardizeQuery(query) {
    query.timeframe = query.timeframe ? query.timeframe : 'this_30_days';
    query.filters = makeFilters(query.filters);
  }

  function makeQuery(name) {
    const props = Queries[name]();
    if (!props) return;

    const hasMany = Array.isArray(props.queries);

    if (hasMany) {
      for (const { query } of props.queries) {
        standardizeQuery(query);
      }
    } else {
      standardizeQuery(props.query);
    }

    if (hasMany) {
      return props.queries.map(query => new Keen.Query(query.type, query.query));
    }

    return new Keen.Query(props.type, props.query);
  }

  // ----------
  // Calculate overall stats first
  // --------
  for (const field of fields) {
    const query = makeQuery(field);
    if (!query) continue;

    const result = await client.perform(query);
    const responseHandler = Queries[field].responseHandler;
    overall[field] = responseHandler(result);
  }

  data.push(overall);

  // ----------
  // Calculate cohort stats second
  // --------

  console.info(`Calculations for dashboard (${campaignId || 'all campaigns'}) is complete`);
  console.log(Queries);
  return { fields, data };
}

module.exports = {
  run,
}
