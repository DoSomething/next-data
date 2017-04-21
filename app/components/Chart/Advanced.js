import React, { Component } from 'react';
import client from '../../keenClient';

class AdvancedChart extends Component {
  constructor(props) {
    super(props);

    this.elementId = Math.floor(Math.random() * 90000);
    this.renderKeenChart = this.renderKeenChart.bind(this);

    // window.addEventListener('resize', this.renderKeenChart);
    // TODO: Need to reduce how often this is called, breaks api limit
  }

  renderKeenChart() {
    setTimeout(() => {
      const { queries, postProcess, options } = this.props;
      const element = document.getElementById(this.elementId);

      const chart = new Keen.Dataviz().el(element);
      Object.keys(options).forEach(key => chart[key](options[key]));
      chart.prepare();

      const mashup = client.run(queries, (err, res) => {
        if (err) {
          console.log(err);
          chart.error(err.message);
          return;
        }

        const result = postProcess(res);
        chart.parseRawData({ result }).render();
      });
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

export default AdvancedChart;
