const Bar = ({x, y, d, xScale, yScale, onMouseEnter, onMouseLeave })=>{
  
  return (
  <g key={y + "Stars"} className={"bar"}>
    <rect 
      key={y + "StarsBar"}
      x={xScale(0)}
      y={yScale(y)}
      width={xScale(x)-xScale(0)}
      height={yScale.bandwidth()}
      opacity={0.7}
      stroke="#9d174d"
      fill="#9d174d"
      fillOpacity={0.3}
      strokeWidth={1}
      onMouseEnter={e=>onMouseEnter(e, d)}
      onMouseLeave={onMouseLeave}
    />
    <text
      key={y + "StarsValue"}
      x={ xScale(x) - 13 }
      y={ yScale(y) + yScale.bandwidth() / 2 }
      textAnchor="end"
      alignmentBaseline="central"
      fontSize={12}
      opacity={xScale(x) > 90 ? 1 : 0} // hide label if bar is not wide enough
    >
      { x }
    </text>

    <text
      key={y + "StarsLabel"}
      x={ xScale.range()[0] + 13}
      y={ yScale(y) + yScale.bandwidth() / 2 }
      textAnchor="base"
      alignmentBaseline="central"
      fontSize={14}
      fontWeight={600}
      opacity={xScale(x) > 90 ? 1 : 0} // hide label if bar is not wide enough
    >
      { y + " Stars" }
    </text>

  </g>  
  )
}

export default Bar