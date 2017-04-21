import React from 'react';
import Keen from 'keen-js';
import { Row, Column } from '../Row';
import Views from '../Stats/Views';
import Signups from '../Stats/Signups';
import Sessions from '../Stats/Sessions';
import SignupsConversion from '../Stats/SignupsConversion';

const viewMetrics = [
  {
    title: 'total page views',
  },
  {
    title: 'total authenticated page views',
    onlyAuthenticated: true,
  },
  {
    title: 'total affiliated page views',
    onlyAffiliated: true,
  }
];

const visitMetrics = [
  {
    title: 'total unique visits',
    unique: true,
  },
  {
    title: 'total unique authenticated visits',
    unique: true,
    onlyAuthenticated: true,
  },
  {
    title: 'total affiliated visits',
    unique: true,
    onlyAffiliated: true,
  }
];

const sessionMetrics = [
  {
    title: 'total unique sessions',
  },
  {
    title: 'total unique authenticated sessions',
    onlyAuthenticated: true,
  },
  {
    title: 'total unique affiliated sessions',
    onlyAffiliated: true,
  }
]

const signupMetrics = [
  [
    {
      title: 'total signups',
      height: 300,
    },
  ],
  [
    {
      title: 'total signups by button location',
      shouldGroupBy: 'source',
      height: 300,
    },
    {
      title: 'total signups by referer',
      shouldGroupBy: 'referer',
      height: 300,
    },
  ]
];

const conversionMetrics = [
  {
    title: '% overall unaffiliated signup conversion based on session',
  },
  {
    title: '% unaffiliated signup conversion per page based on session',
    comparePages: true,
    height: 200,
  },
  // {
  //   title: 'signup conversion per page adjusted for traffic',
  //   comparePages: true,
  //   adjustForTraffic: true,
  //   height: 200,
  // }
];

const CampaignDashboard = ({ options }) => {

  function mapMetricsArray(array, Stat, full) {
    return array.map((stat, index) => (
      <Column full={full} key={index}>
        <Stat queryOptions={options} configuration={stat}/>
      </Column>
    ));
  }

  return (
    <div className="campaign_dashboard">
      <Row>
        <h2>web traffic</h2>
        <p className="footnote">view = amount of times page was opended</p>
        <p className="footnote">visits = amount of times site was opended</p>
        <p className="footnote">session = group of actions that take place within a similiar timespan</p>
      </Row>
      <Row>
        {mapMetricsArray(viewMetrics, Views)}
      </Row>
      <Row>
        {mapMetricsArray(visitMetrics, Views)}
      </Row>
      <Row>
        {mapMetricsArray(sessionMetrics, Sessions)}
      </Row>
      <Row>
        <h2>signups</h2>
        <p className="footnote">affiliated = indicates whether a user has joined a campaign</p>
        <p className="footnote">conversion = user affiliates with a campaign</p>
      </Row>
      <Row>
        {mapMetricsArray(signupMetrics[0], Signups)}
      </Row>
      <Row>
        {mapMetricsArray(signupMetrics[1], Signups)}
      </Row>
      <Row>
        {mapMetricsArray(conversionMetrics, SignupsConversion, true)}
      </Row>
    </div>
  );
};

CampaignDashboard.defaultProps = {
  options: {
    timeframe: 'previous_7_days',
    interval: 'daily'
  }
}

export default CampaignDashboard;
