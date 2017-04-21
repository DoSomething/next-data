import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.scss';

function buildLink(path, index, title) {
  const isHighlighted = location.pathname === path;

  return (
    <li key={index}>
      <Link to={path} className={isHighlighted ? '-highlighted' : ''}>
        { title }
      </Link>
    </li>
  );
}

const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar__container">
      <div className="logo"></div>
      <div className="navigation">
        <h3>campaign dashboards</h3>
        <ul>
          { buildLink("/dashboard/campaigns", 0, "all campaigns") }
          {window.campaigns.map((campaign, index) => {
            const path = `/dashboard/campaigns/${campaign.id}`;
            return buildLink(path, index + 1, campaign.title);
          })}
        </ul>
        <h3>cohort dashboards</h3>
        <ul>
          { buildLink("/dashboard/cohorts", 0, "all campaigns") }
          {window.campaigns.map((campaign, index) => {
            const path = `/dashboard/cohorts/${campaign.id}`;
            return buildLink(path, index + 1, campaign.title);
          })}
        </ul>
      </div>
    </div>
  </div>
);

export default Sidebar;
