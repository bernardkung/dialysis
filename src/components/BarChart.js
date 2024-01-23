import * as d3 from "d3"
import { useMemo } from "react"
import { AxisBottom } from './AxisBottom'
// import { AxisLeft } from './AxisLeft'
import { Axis } from './Axis'
import { Bar } from './Bar'

const BarChart = ({ data, label }) => {
  const dim = { 
    width: 500, height: 500,
    bottomAxisHeight: 15,
    padding: { top: 20, right: 20, bottom: 20, left: 20 }
  }
  const xMin = 0
  const xMax = Math.ceil(Math.max(...Object.values(data))/50) * 50 // Round up to nearest increment of 50
  const keys = [...Object.keys(data)].map(v=>parseInt(v))
  const values = [...Object.values(data)].map(v=>parseInt(v))

  const xScale = useMemo(()=>{
    return d3.scaleLinear()
      .domain([xMin, xMax])
      .range([dim.padding.left, dim.width-dim.padding.right-dim.padding.left])
  }, [data, dim])

  const yScale = useMemo(()=>{
    return d3.scaleBand()
      .domain(keys)
      .range([dim.height-dim.padding.bottom-dim.bottomAxisHeight, dim.padding.top])
      .padding(0.1)
  }, [data, dim])
  
  return (
    <div className={"viz barchart"} name={label}>
      <p className={"vizTitle"}>{ label }</p>

      <svg width={dim.width} height={dim.height}>
        {Object.keys(data).map((key)=>(
          <Bar key={key} x={data[key]} y={key} xScale={xScale} yScale={yScale} />
        ))}


        <AxisBottom xScale={xScale} yScale={yScale} dim={dim} numberOfTicksTarget={10}/>
      </svg>

    </div>
  )
}

export default BarChart