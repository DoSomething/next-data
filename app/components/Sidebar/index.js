import React from 'react';
import DropdownMenu from 'react-dd-menu';
import Container from '../Container';
import './sidebar.scss';

const Sidebar = (container) => {
  const { props } = container;

  const controlSets = [
    {
      title: 'campaigns',
      controls: props.campaigns,
    },
    {
      title: 'dashboards',
      controls: props.dashboards,
    },
    {
      title: 'timeframe',
      controls: props.timeframe,
    },
  ]

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="logo"></div>
        <div className="navigation">
          //
          // {controlSets.map((controls, index) => {
          //   <div key={index}>
          //     <h3>{ controls.title }</h3>
          //     <ul>
          //       {controls.available.map((control, index) => {
          //         const isHighlighted = props.dashboards.current === dashboard;
          //
          //         return (
          //           <li
          //             key={index}
          //             className={isHighlighted ? '-highlighted' : ''}
          //             onClick={() => container.setCurrentDashboard(index)}
          //           >{ dashboard }</li>
          //         );
          //       })}
          //     </ul>
          //   </div>
          // })}

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
