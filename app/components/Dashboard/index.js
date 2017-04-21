import React, { Component } from 'react';
import CampaignDashboard from '../CampaignDashboard';
import CohortDashboard from '../CohortDashboard';
import './dashboard.scss';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeframe: 'previous_7_days',
      interval: 'daily',
    };

    this.getDashboard = this.getDashboard.bind(this);
  }

  getDashboard(type, campaignId) {
    const options = { campaignId, ...this.state };

    switch(type) {
      case 'campaigns': return <CampaignDashboard id={campaignId} options={options} />;
      case 'cohorts': return <CohortDashboard id={campaignId} options={options} />;
      default: return ( <h1>404</h1> );
    }
  }

  render() {
    const type = location.pathname.split('/')[2];
    const campaignId = location.pathname.split('/')[3] || null;
    const campaignTitle = this.state.campaignId ?
      window.campaigns.find((campaign) => campaign.id == campaignId).title : 'all campaigns';

    const dashboard = this.getDashboard(type, campaignId);

    return (
      <div className="dashboard">
        <div className="dashboard__container">
          <h1>{ campaignTitle }</h1>
          { dashboard }
        </div>
      </div>
    );
  }
}

export default Dashboard;
