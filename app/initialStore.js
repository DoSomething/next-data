const store = {
  campaigns: {
    current: 0,
    available: [
      {
        title: 'All Campaigns',
      },
      {
        id: 7656,
        title: 'Sincerely, Us',
      }
    ]
  },
  timeframe: {
    current: 'previous_7_days',
    available: [
      'previous_1_days',
      'previous_7_days',
      'previous_30_days',
    ],
  },
  dashboards: {
    current: 'traffic',
    available: [
      'traffic',
      'conversions',
      'sharing',
      'returns',
    ],
  },
};

export default store;
