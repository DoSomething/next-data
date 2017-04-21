import React, { Component } from 'react';
import client from '../../keenClient';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.elementId = Math.floor(Math.random() * 90000);
    this.renderKeenChart = this.renderKeenChart.bind(this);

    // window.addEventListener('resize', this.renderKeenChart);
    // TODO: Need to reduce how often this is called, breaks api limit
  }

  renderKeenChart() {
    setTimeout(() => {
      const { query, options } = this.props;
      const element = document.getElementById(this.elementId);

      client.draw(query, element, options);
    }, 0);
  }

  componentDidMount() {
    this.renderKeenChart();
  }

  componentDidUpdate() {
    this.renderKeenChart();
  }

  render() {
    return (
      <div id={this.elementId} className="chart">
        <h2>loading...</h2>
      </div>
    );
  }
}

export default Chart;
