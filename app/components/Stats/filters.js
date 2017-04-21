export const authenticated = {
  'property_name': 'user.id',
  'operator': 'ne',
  'property_value': null,
};

export const affiliated = {
  'property_name': 'signups.thisCampaign',
  'operator': 'eq',
  'property_value': true,
};

export const notAffiliated = {
  'property_name': 'signups.thisCampaign',
  'operator': 'eq',
  'property_value': false,
};

export const totalViews = {
  'property_name': 'action.type',
  'operator': 'eq',
  'property_value': '@@router/LOCATION_CHANGE',
};

export const signup = {
  'property_name': 'action.type',
  'operator': 'eq',
  'property_value': 'SIGNUP_CREATED',
};

export const scholarshipsPage = {
  'property_name': 'page.path',
  'operator': 'contains',
  'property_value': '/pages/scholarship',
};

export const notScholarshipsPage = {
  'property_name': 'page.path',
  'operator': 'not_contains',
  'property_value': '/pages/scholarship',
}

export const faqPage = {
  'property_name': 'page.path',
  'operator': 'contains',
  'property_value': '/pages/faqs',
};

export const notFaqPage = {
  'property_name': 'page.path',
  'operator': 'not_contains',
  'property_value': '/pages/faqs',
};

export const actionPage = {
  'property_name': 'page.path',
  'operator': 'contains',
  'property_value': '/action', //TODO: We probably need a better way of doing this?
};

export const notActionPage = {
  'property_name': 'page.path',
  'operator': 'not_contains',
  'property_value': '/action',
};

export const communityPage = [
  notActionPage,
  notFaqPage,
  notScholarshipsPage,
];

export const campaign = (campaignId) => ({
  'property_name': 'campaign.legacyCampaignId',
  'operator': 'eq',
  'property_value': campaignId
});

export const transform = (filter) => ({
  ...filter,
  'property_name': `transformedState.${filter.property_name}`,
});
