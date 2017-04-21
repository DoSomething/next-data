import {
  TOGGLE_CAMPAIGN_MENU,
  CLOSE_CAMPAIGN_MENU,
  CHANGE_CAMPAIGN,
} from '../actions';

export const campaigns = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_CAMPAIGN_MENU:
      return {
        ...state,
        menu: {
          ...state.menu,
          open: !state.menu.open,
        }
      };

    case CLOSE_CAMPAIGN_MENU:
      return {
        ...state,
        menu: {
          ...state.menu,
          open: false,
        }
      }

    case CHANGE_CAMPAIGN:
      return {
        ...state,
        current: action.campaign,
      }
  }
  return state;
}
