const operators = {
  equal: 'eq',
  contains: 'contains',
  doesNotContain: 'not_contains',
}

module.exports = {
  campaign: (id) => {
    return {
      property_name: 'campaign.legacyCampaignId',
      operator: operators.equal,
      property_value: id,
    };
  },

  isSignup: {
    property_name: 'action.type',
    operator: operators.equal,
    property_value: 'SIGNUP_CREATED'
  },

  isAffiliated: {
    property_name: 'signups.thisCampaign',
    operator: operators.equal,
    property_value: true,
  },

  notAffiliated: {
    property_name: 'signups.thisCampaign',
    operator: operators.equal,
    property_value: false,
  },

  onScholarshipTab: {
    property_name: 'page.path',
    operator: operators.contains,
    property_value: '/pages/scholarships',
  },

  onCommunityTab: [
    {
      property_name: 'page.path',
      operator: operators.doesNotContain,
      property_value: '/pages',
    },
    {
      property_name: 'page.path',
      operator: operators.doesNotContain,
      property_value: '/action',
    },
  ],

  onActionTab: {
    property_name: 'page.path',
    operator: operators.contains,
    property_value: '/action',
  },

  onFaqTab: {
    property_name: 'page.path',
    operator: operators.contains,
    property_value: '/pages/faq',
  },
}
