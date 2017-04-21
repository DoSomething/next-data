import {
  TOGGLE_TIMEFRAME_MENU,
  CLOSE_TIMEFRAME_MENU,
  CHANGE_TIMEFRAME,
} from '../actions';

export const timeframe = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_TIMEFRAME_MENU:
      return {
        ...state,
        menu: {
          ...state.menu,
          open: !state.menu.open,
        }
      };

    case CLOSE_TIMEFRAME_MENU:
      return {
        ...state,
        menu: {
          ...state.menu,
          open: false,
        }
      }

    case CHANGE_TIMEFRAME:
      return {
        ...state,
        value: action.timeframe,
      }
  }
  return state;
}
