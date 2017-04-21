import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Chrome from './components/Chrome';
import './keenClient';
import './main.scss';

window.campaigns = [
  {
    id: 7656,
    title: 'Sincerely, Us',
  }
];

Keen.ready(() => {
  render((
    <Router>
      <div>
        <Route path="/" component={Chrome} />
      </div>
    </Router>
  ), document.getElementById('jsx-root'));
});
