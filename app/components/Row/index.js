import React from 'react';
import './row.scss';

export const Row = ({ children }) => (
  <div className="row">
    { children }
  </div>
);

export const Column = ({ children, full }) => (
  <div className={`column ${full ? '-full' : ''}`}>
    <div className="column__container">
      { children }
    </div>
  </div>
);
