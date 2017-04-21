import {
  SET_CURRENT_DASHBOARD
} from '../actions';

export const dashboards = (state = {}, action) => {
  console.log(action)
  switch (action.type) {
    case SET_CURRENT_DASHBOARD:
      return {
        ...state,
        current: state.available[action.dashboardIndex],
      };
  }
  return state;
}
