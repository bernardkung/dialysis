import * as d3 from "d3";
import { useMemo } from "react";
import { VerticalAxis } from './VerticalAxis';
import { HorizontalAxis } from './HorizontalAxis';

const TimeSeries = ({ data, label, dims, colors }) => {
  const xMin = 0


  return (
    <div className={"viz scatterChart"} name={label}>
      <p className={"vizTitle"}>{ label }</p>

      <svg width={dims.width} height={dims.height}>

      </svg>
    </div>
  )
}
export default TimeSeries
