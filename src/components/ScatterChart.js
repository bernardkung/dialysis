import * as d3 from "d3";
import { useMemo } from "react";
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';

const ScatterChart = ({ data, label, dims, colors }) => {

  // x-axis: Total Performance Score (totalPerformanceScore)
  // y-axis: Mortality Rate (mortalityRate)
  // legend: Chain Ownership (chainOwnership)
  const totalPerformanceScores = data.map(d=>d.totalPerformanceScore)
  const xMin = 0
  const xMax = 100
  // const xMax = Math.max(totalPerformanceScores) 
  // const xInc = 50
  // const xMax = Math.ceil( Math.max(totalPerformanceScores) / xInc ) * xInc 
  
  const mortalityRates = data.map(d=>d.mortalityRate)
  const yMin = 0
  const yMax = 100

  console.log(mortalityRates, totalPerformanceScores)

  const xScale = useMemo(()=>{
    return d3.scaleLinear()
      .domain([xMin, xMax])
      .range([dims.padding.left, dims.width-dims.padding.right-dims.padding.left])
  }, [data, dims])

  const yScale = useMemo(()=>{
    return d3.scaleLinear()
      .domain([yMin, yMax])
      .range([dims.height-dims.padding.bottom-dims.bottomAxisHeight, dims.padding.top])
  }, [data, dims])
  

  return (
    <div className={"viz scatterChart"} name={label}>
      <p className={"vizTitle"}>{ label }</p>

      <svg width={dims.width} height={dims.height}>
        



        
        <AxisBottom xScale={xScale} yScale={yScale} dims={dims} numberOfTicksTarget={10}/>
        <AxisLeft xScale={xScale} yScale={yScale} dims={dims} numberOfTicksTarget={10}/>
      </svg>

    </div>
  )
}
export default ScatterChart
