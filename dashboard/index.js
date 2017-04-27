const console = require('keypunch');
const Keen = require('keen-js');
const Filters = require('../keen/Filters');
const Queries = require('../keen/Queries');
const ResponseHandlers = require('../keen/ResponseHandlers');

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

  function standardizeQuery(query, overrides) {
    query.filters = makeFilters(query.filters);
    query.timeframe = query.timeframe ? query.timeframe : 'this_30_days';

    if (!overrides) return;

    for (const overrideKey of Object.keys(overrides)) {
      if (Array.isArray(query[overrideKey])) {
        query[overrideKey] = [...query[overrideKey], ...overrides[overrideKey]];
      } else {
        query[overrideKey] = overrides[overrideKey];
      }
    }
  }

  function makeQuery(name, overrides, isStep) {
    let props = Queries[name];
    if (!props) return;
    props = props();

    const hasMany = Array.isArray(props.queries);

    if (hasMany) {
      for (const { query } of props.queries) {
        standardizeQuery(query, overrides);
      }
    } else {
      standardizeQuery(props.query, overrides);
    }

    if (isStep) {
      return props.queries || [props.query];
    }

    if (hasMany) {
      return props.queries.map(query => new Keen.Query(query.type, query.query));
    }

    return new Keen.Query(props.type, props.query);
  }

  function makeCohort(name, overrides, actor) {
    overrides.actor_property = actor;
    const steps = makeQuery(name, overrides, true);
    return new Keen.Query('funnel', { steps });
  }

  // ----------
  // Calculate overall stats first
  // --------
  // TODO: Break this into a function so the funnels can also use it
  for (const field of fields) {
    const query = makeQuery(field);
    if (!query) continue;

    const result = await client.perform(query);
    const responseHandler = ResponseHandlers[Queries[field]().responseHandler];
    overall[field] = responseHandler(result);
  }

  data.push(overall);

  // ----------
  // Calculate signups cohort stats second
  // --------
  const WEEK = 6048e5;
  const INCEPTION = new Date("2017-04-17T00:00:00.000Z").getTime();
  const totalCohorts = Math.floor((new Date() - INCEPTION) / WEEK);

  for (let cohortIndex = 0; cohortIndex < totalCohorts; cohortIndex++) {
    const start = INCEPTION + (cohortIndex * WEEK);
    const end = start + (WEEK - 1);

    const startString = new Date(start).toUTCString();
    const endString = new Date(end).toUTCString();

    const overrides = {
      timeframe: {
        start: startString,
        end: endString,
      }
    };

    const cohort = { group: `${startString}-${endString}` };

    for (let fieldIndex = 1; fieldIndex < fields.length; fieldIndex++) {
      const field = fields[fieldIndex];
      const query = makeQuery(field, overrides);
      if (!query) continue;

      const result = await client.perform(query);
      const responseHandler = ResponseHandlers[Queries[field]().responseHandler];
      cohort[field] = responseHandler(result);
    }

    data.push(cohort);
  }

  console.info(`Calculations for dashboard (${campaignId || 'all campaigns'}) is complete`);
  return { fields, data };
}

module.exports = {
  run,
}
