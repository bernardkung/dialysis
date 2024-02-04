import * as d3 from "d3"
import { useMemo } from "react"
import { AxisBottom } from './AxisBottom'
// import { AxisLeft } from './AxisLeft'
import { Axis } from './Axis'
import { Bar } from './Bar'

const BarChart = ({ data, label, dims }) => {
  const xMin = 0
  const xMax = Math.ceil(Math.max(...Object.values(data))/50) * 50 // Round up to nearest increment of 50
  const keys = [...Object.keys(data)].map(v=>parseInt(v))
  const values = [...Object.values(data)].map(v=>parseInt(v))

  const xScale = useMemo(()=>{
    return d3.scaleLinear()
      .domain([xMin, xMax])
      .range([dims.padding.left, dims.width-dims.padding.right-dims.padding.left])
  }, [data, dims])

  const yScale = useMemo(()=>{
    return d3.scaleBand()
      .domain(keys)
      .range([dims.height-dims.padding.bottom-dims.bottomAxisHeight, dims.padding.top])
      .padding(0.1)
  }, [data, dims])
  
  return (
    <div className={"viz barchart"} name={label}>
      <p className={"vizTitle"}>{ label }</p>

      <svg width={dims.width} height={dims.height}>
        {Object.keys(data).map((key)=>(
          <Bar key={key} x={data[key]} y={key} xScale={xScale} yScale={yScale} />
        ))}


        <AxisBottom scale={xScale} xScale={xScale} yScale={yScale} dims={dims} numberOfTicksTarget={10}/>
      </svg>

    </div>
  )
}

export default BarChart