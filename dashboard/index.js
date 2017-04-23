const console = require('keypunch');
const Keen = require('keen-js');
const Filters = require('../keen/Filters');
const Queries = require('../keen/Queries');

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

  const data = [];
  const overall = {};

  function makeFilters(filters) {
    if (!filters) filters = [];
    if (!Array.isArray(filters)) filters = [filters];
    if (!campaignId) return filters;
    return [...filters, Filters.campaign(campaignId)];
  }

  function standardizeQuery(query) {
    query.timeframe = 'this_30_days';
    query.filters = makeFilters(query.filters);
  }

  function makeQuery(name, makePropsOnly = false) {
    const props = Queries[name];
    if (!props) return;

    const hasMany = Array.isArray(props.queries);

    if (hasMany) {
      for (const { query } of props.queries) {
        standardizeQuery(query);
      }
    } else {
      standardizeQuery(props.query);
    }

    if (makePropsOnly) return props;

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

  console.info(`Calculations for dashboard (${campaignId || 'all campaigns'}) is complete`);
  return { fields, data };
}

module.exports = {
  run,
}
