import React from 'react';
import * as types from '../types';
import drawChart from './drawChart';

type Props = {
  temperatures: ReadonlyArray<types.Temperature>;
};

class TemperatureChart extends React.PureComponent<Props> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    temperatures: [],
  };

  chart: HTMLDivElement | null;

  componentDidMount() {
    const { temperatures } = this.props;

    if (this.chart !== null) {
      drawChart(this.chart, temperatures);
    }
  }

  UNSAFE_componentWillReceiveProps() {
    const { temperatures } = this.props;

    if (this.chart !== null) {
      drawChart(this.chart, temperatures);
    }
  }

  render() {
    return (
      <div
        className="temperature-chart"
        ref={(ref) => {
          this.chart = ref;
        }}
      />
    );
  }
}

export default TemperatureChart;
