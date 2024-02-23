import * as d3 from "d3";
import { useMemo } from "react";

const PieChart = ({ data, label, dims, colors }) => {

  // Compute a pie generator = a function that transforms a dataset in a list of arcs
  const pieGenerator = d3.pie().value((d) => d.y)
  
  // Use this pie generator on our initial dataset
  const pie = pieGenerator(data)

  // Compute an arc generator = a function that transforms arc coordinates in a svg path
  const arcPathGenerator = d3.arc();

  // For each arc, use the path generator
  const arcs = pie.map((p) =>
    arcPathGenerator({
      innerRadius: dims.innerRadius,
      outerRadius: dims.outerRadius,
      startAngle: p.startAngle,
      endAngle: p.endAngle,
    })
  )


  // console.log("data:", Object.keys(data).map(key=>{return {[key]: data[key]}}))
  // console.log("pie:", pie)
  // console.log("arcs:", arcs)

  return (
    <div className={"viz piechart"} name={label}>
      <p className={"vizTitle"}>{ label }</p>

      <svg width={dims.width} height={dims.height}>
        <g transform={`translate(${dims.width / 2}, ${dims.height / 2})`}>
          {arcs.map((arc, i)=>{
            return <path key={i} d={arc} fill={colors[i]} />
          })}
        </g>
      </svg>

    </div>
  )
}
export default PieChart
