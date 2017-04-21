import React from 'react';
import Container from '../Container';
import './sidebar.scss';

const Sidebar = (container) => {
  const { props } = container;

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="logo"></div>
        <div className="navigation">
          <h2>{ props.timeframe.value }</h2>
          <h2>{ props.campaigns.current || 'all campaigns' }</h2>
          <h3>dashboards</h3>
          <ul>
            {props.dashboards.available.map((dashboard, index) => {
              const isHighlighted = props.dashboards.current === dashboard;

              return (
                <li
                  key={index}
                  className={isHighlighted ? '-highlighted' : ''}
                  onClick={() => container.setCurrentDashboard(index)}
                >{ dashboard }</li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Container(Sidebar);
