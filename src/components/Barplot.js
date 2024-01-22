import * as d3 from "d3"
import { useMemo } from "react"
import { AxisBottom } from './AxisBottom'
// import { AxisLeft } from './AxisLeft'
import { Axis } from './Axis'
import { Bar } from './Bar'

const Barplot = ({ data, label }) => {
  const dim = { 
    width: 500, height: 500,
    bottomAxisHeight: 30,
    padding: { top: 20, right: 20, bottom: 20, left: 20 }
  }
  const xMin = 0
  const xMax = Math.max(...Object.values(data))
  const keys = [...Object.keys(data)].map(v=>parseInt(v))
  const values = [...Object.values(data)].map(v=>parseInt(v))

  const xScale = useMemo(()=>{
    return d3.scaleLinear()
      .domain([xMin, xMax])
      .range([dim.padding.left, dim.width-dim.padding.right])
  }, [data, dim.width])

  const yScale = useMemo(()=>{
    return d3.scaleBand()
      .domain(keys)
      .range([dim.height-dim.padding.bottom-dim.bottomAxisHeight, dim.padding.top])
      .padding(0.1)
  }, [data, dim])
  
  return (
    <div className={"barplot"} name={label}>
      <p>{ label }</p>

      <svg width={dim.width} height={dim.height}>
        {Object.keys(data).map((key)=>(
          <Bar key={key} x={data[key]} y={key} xScale={xScale} yScale={yScale} />
        ))}

      {/* <AxisLeft yScale={yScale}  pixelsPerTick={1}/> */}

        <AxisBottom xScale={xScale} dim={dim} pixelsPerTick={50}/>
      </svg>

      {/* <Axis /> */}


    </div>
  )
}

export default Barplot