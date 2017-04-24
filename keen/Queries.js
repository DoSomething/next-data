const Filters = require('./Filters');
const names = require('./QueryNames');

const queries = {};

queries[names.NUMBER_OF_SIGNUPS] = {
  type: 'count',
  query: {
    event_collection: 'action',
    filters: Filters.isSignup,
  },
  responseHandler: 'default',
};

queries[names.NUMBER_OF_UNIQUE_VISITORS] = {
  type: 'count_unique',
  query: {
    event_collection: 'action',
    target_property: 'user.session.id',
  },
  responseHandler: 'default',
};

queries[names.UNAFFILIATED_CONVERSION_RATE_OVERALL] = {
  queries: [
    queries[names.NUMBER_OF_SIGNUPS],
    queries[names.NUMBER_OF_UNIQUE_VISITORS],
  ],
  responseHandler: 'conversionRateBetweenTwo',
};

queries[names.NUMBER_OF_SIGNUPS_SCHOLARSHIP_TAB] = {
  type: 'count',
  query: {
    event_collection: 'action',
    filters: [Filters.isSignup, Filters.onScholarshipTab],
  },
  responseHandler: 'default',
};

queries[names.NUMBER_OF_UNIQUE_AFFILIATED_VISITORS_SCHOLARSHIP_TAB] = {
  type: 'count_unique',
  query: {
    event_collection: 'action',
    filters: [Filters.onScholarshipTab, Filters.isAffiliated],
    target_property: 'user.session.id',
  },
  responseHandler: 'default',
};

queries[names.NUMBER_OF_UNIQUE_UNAFFILIATED_VISITORS_SCHOLARSHIP_TAB] = {
  type: 'count_unique',
  query: {
    event_collection: 'action',
    filters: [Filters.onScholarshipTab, Filters.notAffiliated],
    target_property: 'user.session.id',
  },
  responseHandler: 'default',
};

queries[names.CONVERSION_RATE_SCHOLARSHIP_TAB] = {
  queries: [
    queries[names.NUMBER_OF_SIGNUPS_SCHOLARSHIP_TAB],
    queries[names.NUMBER_OF_UNIQUE_UNAFFILIATED_VISITORS_SCHOLARSHIP_TAB],
  ],
  responseHandler: 'conversionRateBetweenTwo',
};

queries[names.NUMBER_OF_SIGNUPS_COMMUNITY_TAB] = {
  type: 'count',
  query: {
    event_collection: 'action',
    filters: [Filters.isSignup, ...Filters.onCommunityTab],
  },
  responseHandler: 'default',
};

queries[names.NUMBER_OF_UNIQUE_AFFILIATED_VISITORS_COMMUNITY_TAB] = {
  type: 'count_unique',
  query: {
    event_collection: 'action',
    filters: [...Filters.onCommunityTab, Filters.isAffiliated],
    target_property: 'user.session.id',
  },
  responseHandler: 'default',
};

queries[names.NUMBER_OF_UNIQUE_UNAFFILIATED_VISITORS_COMMUNITY_TAB] = {
  type: 'count_unique',
  query: {
    event_collection: 'action',
    filters: [...Filters.onCommunityTab, Filters.notAffiliated],
    target_property: 'user.session.id',
  },
  responseHandler: 'default',
};

queries[names.CONVERSION_RATE_COMMUNITY_TAB] = {
  queries: [
    queries[names.NUMBER_OF_SIGNUPS_COMMUNITY_TAB],
    queries[names.NUMBER_OF_UNIQUE_UNAFFILIATED_VISITORS_COMMUNITY_TAB],
  ],
  responseHandler: 'conversionRateBetweenTwo',
};

queries[names.NUMBER_OF_SIGNUPS_ACTION_TAB] = {
  type: 'count',
  query: {
    event_collection: 'action',
    filters: [Filters.isSignup, Filters.onActionTab],
  },
  responseHandler: 'default',
};

queries[names.NUMBER_OF_UNIQUE_AFFILIATED_VISITORS_ACTION_TAB] = {
  type: 'count_unique',
  query: {
    event_collection: 'action',
    filters: [Filters.onActionTab, Filters.isAffiliated],
    target_property: 'user.session.id',
  },
  responseHandler: 'default',
};

queries[names.NUMBER_OF_UNIQUE_UNAFFILIATED_VISITORS_ACTION_TAB] = {
  type: 'count_unique',
  query: {
    event_collection: 'action',
    filters: [Filters.onActionTab, Filters.notAffiliated],
    target_property: 'user.session.id',
  },
  responseHandler: 'default',
};

queries[names.CONVERSION_RATE_ACTION_TAB] = {
  queries: [
    queries[names.NUMBER_OF_SIGNUPS_ACTION_TAB],
    queries[names.NUMBER_OF_UNIQUE_UNAFFILIATED_VISITORS_ACTION_TAB],
  ],
  responseHandler: 'conversionRateBetweenTwo',
};

queries[names.NUMBER_OF_SIGNUPS_FAQ_TAB] = {
  type: 'count',
  query: {
    event_collection: 'action',
    filters: [Filters.isSignup, Filters.onFaqTab],
  },
  responseHandler: 'default',
};

queries[names.NUMBER_OF_UNIQUE_AFFILIATED_VISITORS_FAQ_TAB] = {
  type: 'count_unique',
  query: {
    event_collection: 'action',
    filters: [Filters.onFaqTab, Filters.isAffiliated],
    target_property: 'user.session.id',
  },
  responseHandler: 'default',
};

queries[names.NUMBER_OF_UNIQUE_UNAFFILIATED_VISITORS_FAQ_TAB] = {
  type: 'count_unique',
  query: {
    event_collection: 'action',
    filters: [Filters.onFaqTab, Filters.notAffiliated],
    target_property: 'user.session.id',
  },
  responseHandler: 'default',
};

queries[names.CONVERSION_RATE_FAQ_TAB] = {
  queries: [
    queries[names.NUMBER_OF_SIGNUPS_FAQ_TAB],
    queries[names.NUMBER_OF_UNIQUE_UNAFFILIATED_VISITORS_FAQ_TAB],
  ],
  responseHandler: 'conversionRateBetweenTwo',
};

const wrappers = {};

Object.keys(queries).forEach(queryName => {
  wrappers[queryName] = () => JSON.parse(JSON.stringify(queries[queryName]));
});

module.exports = wrappers;
