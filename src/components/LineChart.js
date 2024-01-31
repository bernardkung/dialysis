import * as d3 from "d3";
import { useMemo } from "react";

const LineChart = ({ data, label, dims, colors }) => {

  

  return (
    <div className={"viz lineChart"} name={label}>
      <p className={"vizTitle"}>{ label }</p>

      <svg width={dims.width} height={dims.height}>
        
        
      </svg>

    </div>
  )
}
export default LineChart
