import { connect } from 'react-redux';
import * as actions from '../actions';

function getState(state) {
  return { props: state };
}

export default (component) => connect(getState, actions)(component);
