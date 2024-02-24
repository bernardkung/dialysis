import * as d3 from "d3"
import { useMemo, useState } from "react"
import { HorizontalAxis } from './HorizontalAxis';
import Bar from './Bar'
import Tooltip from './Tooltip'

const BarChart = ({ data, xVar, yVar, orient="horizontal", label, dims }) => {
  const [ tooltipData, setTooltipData ] = useState({})

  const xMin = 0
  const xMax = d3.max(data.map(d=>d[xVar]))
  // const yMin = d3.min(data.map(d=>d[yVar]))
  // const yMax = d3.max(data.map(d=>d[yVar]))
  const yDomain = data.map(d=>d[yVar])


  const xScale = useMemo(()=>{
    return d3.scaleLinear()
      .domain([xMin, xMax])
      .range([dims.padding.left, dims.width-dims.padding.right-dims.padding.left])
      .nice()
  }, [data, dims])

  const yScale = useMemo(()=>{
    return d3.scaleBand()
      .domain(yDomain)
      .range([dims.height-dims.padding.bottom-dims.bottomAxisHeight, dims.padding.top])
      .padding(0.1)
  }, [data, dims])
  
  const onMouseEnter = (e, d)=>{
    console.log("d:", d, d.y, yScale(d.x), yDomain[0])
    setTooltipData({
      xPos: xScale(d.x),
      yPos: yScale(d[yVar]),
      name: "tooltip",
    })
  }

  const onMouseLeave = (e)=>{
    // console.log(e)
  }
  

  return (
    <div className={"viz barchart"} name={label}>
      <p className={"vizTitle"}>{ label }</p>

      <svg width={dims.width} height={dims.height}>
        {data.map(d=>(
          <Bar 
            key={d[xVar]} 
            x={d[xVar]} 
            y={d[yVar]} 
            d={d}
            xScale={xScale} 
            yScale={yScale}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        ))}


        <HorizontalAxis scale={xScale} xScale={xScale} axisLabel={"# of Facilities"} dims={dims} numberOfTicksTarget={10}/>
        <Tooltip data={tooltipData}/>
      </svg>

    </div>
  )
}

export default BarChart