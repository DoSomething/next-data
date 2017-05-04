import { operators, Filter } from './_base';

class CampaignFilter extends Filter {
  constructor(campaignId) {
    super();

    this._addFilter(
      'campaign.legacyCampaignId',
      operators.equal,
      campaignId
    );
  }
}

export default CampaignFilter;
