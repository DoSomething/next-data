export const TOGGLE_TIMEFRAME_MENU = 'TOGGLE_TIMEFRAME_MENU';
export const CLOSE_TIMEFRAME_MENU = 'CLOSE_TIMEFRAME_MENU';
export const CHANGE_TIMEFRAME = 'CHANGE_TIMEFRAME';

export function toggleTimeframeMenu() {
  return { type: TOGGLE_TIMEFRAME_MENU };
}

export function closeTimeframeMenu() {
  return { type: CLOSE_TIMEFRAME_MENU };
}

export function changeTimeframe(timeframe) {
  return { type: CHANGE_TIMEFRAME, timeframe };
}
