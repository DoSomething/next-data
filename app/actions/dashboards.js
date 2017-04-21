export const SET_CURRENT_DASHBOARD = 'SET_CURRENT_DASHBOARD';

export function setCurrentDashboard(dashboardIndex) {
  return { type: SET_CURRENT_DASHBOARD, dashboardIndex };
}
