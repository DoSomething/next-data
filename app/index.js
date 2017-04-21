import React from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import * as reducers from './reducers';
import initialStore from './initialStore';

import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

import './keenClient';
import './main.scss';

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  initialStore,
  applyMiddleware(middleware)
);

Keen.ready(() => {
  render((
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Sidebar />
          <Dashboard />
        </div>
      </ConnectedRouter>
    </Provider>
  ), document.getElementById('jsx-root'));
});
