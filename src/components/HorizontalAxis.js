import { useMemo } from "react";
// import { ScaleLinear } from "d3";


export const HorizontalAxis = ({ xScale, dims, axisLabel, axisPosition, numberOfTicksTarget, tickLength = 5}) => {

  const ticks = useMemo(() => {
    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value: value,
      xOffset: xScale(value),
    }))
  }, [xScale]);

  const axisOffset = dims.height - dims.padding.bottom - 13
  // const axisOffset = dim.height - dim.padding.bottom - dim.bottomAxisHeight
  const axisStart= scale.range()[0]
  const axisStop = scale.range()[1]
  const axisWidth= axisStop - axisStart
  const linePath = ["M", xScale.range()[0], yLoc, "L", xScale.range()[1], yLoc].join(" ")


  return (
    <g className="bottomAxis">
      {/* Main horizontal line */}
      <path
        d={linePath}
        fill="none"
        stroke="currentColor"
      />

      {/* Ticks and labels */}
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, ${yLoc})`}>
          <line y2={tickLength} stroke="currentColor" />
          <text
            key={ value }
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateY(20px)",
            }}
          >
          { value }
          </text>
        </g>
      ))}
      
      {/* Axis Label */}
      <g
        transform= {`translate(${dims.padding.left+(xScale.range()[1])/2}, ${yLoc + 35})`}
      >
        { axisLabel 
          ? <text
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: `translate(${(xScale.range()[1])/2}, ${yLoc})`,
            }}
            >
              {axisLabel}
            </text>
          : <></>
        }
      </g>
    </g>
  );
};
