export const TOGGLE_CAMPAIGN_MENU = 'TOGGLE_CAMPAIGN_MENU';
export const CLOSE_CAMPAIGN_MENU = 'CLOSE_CAMPAIGN_MENU';
export const CHANGE_CAMPAIGN = 'CHANGE_CAMPAIGN';

export function toggleCampaignMenu() {
  return { type: TOGGLE_CAMPAIGN_MENU };
}

export function closeCampaignMenu() {
  return { type: CLOSE_CAMPAIGN_MENU };
}

export function changeCampaign(campaign) {
  return { type: CHANGE_CAMPAIGN, campaign };
}
