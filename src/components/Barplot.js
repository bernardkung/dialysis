import * as d3 from "d3"


const Barplot = ({ data, label }) => {
  const dim = { width: 500, height: 500 }

  const xMin = 0
  const xMax = Math.max(...Object.values(data))
  const yMin = 0
  const yMax = 5
  const keys = [...Object.keys(data)].map(v=>parseInt(v))
  const values = [...Object.values(data)].map(v=>parseInt(v))

  console.log(values)
  const xScale = d3.scaleLinear()
    .domain([xMin, xMax])
    .range([0, dim.width])

  const yScale = d3.scaleBand()
    .domain(keys)
    .range([dim.height, 0])
  
   Object.keys(data).map((key)=>{
    console.log("k:", key, yScale(parseInt(key)))
    })

  return (
    <div className={"barplot"} name={label}>
      <p>{ label }</p>
      <svg width={dim.width} height={dim.height}>
        {Object.keys(data).map((key)=>(
          <rect 
            key={key + "stars"}
            x={xScale(0)}
            y={yScale(parseInt(key))}
            width={xScale(data[key])}
            height={20}
            opacity={0.7}
            stroke="#9d174d"
            fill="#9d174d"
            fillOpacity={0.3}
            strokeWidth={1}
          />
        ))}
      </svg>
    </div>
  )
}

export default Barplot