export const Circle = ({ cx, cy, radius=7, fill, xScale, yScale })=>{

  return (
  <g className={"circle"}>
    <circle
      r = { radius } // radius
      cx = { xScale(cx) } // position on the X axis
      cy = { yScale(cy) } // on the Y axis
      opacity = { 1 }
      stroke = { fill }
      fill = { fill }
      fillOpacity = { 0.2 }
      strokeWidth = { 1 }
    />

  </g>  
  )

}