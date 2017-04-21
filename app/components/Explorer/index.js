import React from 'react';
import Container from '../Container';
import './explorer.scss';

const Explorer = (container) => {
  return (
    <div className="explorer">
      <div className="explorer__chart"></div>
      <div className="explorer__container">
        <div className="explorer__controls">

        </div>
      </div>
    </div>
  );
};

Explorer.defaultProps = {
  title: '',
  configuration: null
};

export default Container(Explorer);
