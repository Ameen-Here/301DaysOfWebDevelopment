import ChartBar from "./ChartBar";
import "./Chart.css";

import "./Chart.css";

const Chart = (props) => {
  const expensesValue = props.dataPoints.map((data) => data.value);
  const maxValue = Math.max(...expensesValue);

  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => {
        return (
          <ChartBar
            key={dataPoint.label}
            label={dataPoint.label}
            max={maxValue}
            value={dataPoint.value}
          />
        );
      })}
    </div>
  );
};
export default Chart;
