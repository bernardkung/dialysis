import * as d3 from "d3";
import { useMemo } from "react";
import { VerticalAxis } from './VerticalAxis';
import { HorizontalAxis } from './HorizontalAxis';

const TimeSeries = ({ data, label, dims, colors }) => {
  // const xMin = d3.min(data.map(d=>d.date))
  // const xMax = d3.max(data.map(d=>d.date))
  // const xMin = data[0]['date']
  // const xMax = data[data.length-1]['date']
  const xMin = new Date(data[0]['date'])
  const xMax = new Date(data[data.length-1]['date'])
  const yMin = d3.min(data.map(d=>d.value))
  const yMax = d3.max(data.map(d=>d.value))

  const xScale = useMemo(()=>{
    return d3.scaleTime()
      .domain([xMin, xMax])
      .range([dims.padding.left, dims.width-dims.padding.right-dims.padding.left])
  }, [data, dims])

  const yScale = useMemo(()=>{
    return d3.scaleLinear()
      .domain([yMin, yMax])
      .range([dims.height-dims.padding.bottom-dims.bottomAxisHeight, dims.padding.top])
  }, [data, dims])

  console.log(xMin, xMax)
  console.log("domain:", xScale.domain())

  return (
    <div className={"viz scatterChart"} name={label}>
      <p className={"vizTitle"}>{ label }</p>

      <svg width={dims.width} height={dims.height}>

      <HorizontalAxis axisLabel={"Year"} scale={xScale} axisPosition={"bottom"} xScale={xScale} yScale={yScale} dims={dims} numberOfTicksTarget={10}/>
      <VerticalAxis axisLabel={"Cumulative Sum"} scale={yScale} axisPosition={"left"} yScale={yScale} dims={dims} numberOfTicksTarget={10}/>

      </svg>
    </div>
  )
}
export default TimeSeries
