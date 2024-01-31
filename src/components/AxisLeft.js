import { useMemo } from "react";
import { ScaleLinear } from "d3";


export const AxisLeft = ({ xScale, yScale, dims, numberOfTicksTarget, tickLength = 5}) => {

  const ticks = useMemo(() => {
    return yScale.ticks(numberOfTicksTarget).map((value) => ({
      value: value,
      yOffset: yScale(value),
    }))
  }, [yScale]);

  const xLoc = dims.padding.left

  
  console.log(xLoc)

  return (
    <g className="leftAxis">
      {/* Main Axis Line */}
      <path
        d={["M", xLoc, yScale.range()[0], "L", xLoc, yScale.range()[1]].join(" ")}
        fill="none"
        stroke="currentColor"
      />

      {/* Ticks and labels */}
      {ticks.map(({ value, yOffset }) => (
        <g key={value} transform={`translate(${xLoc-tickLength}, ${yOffset})`}>
          <line x2={tickLength} stroke="currentColor" />
          <text
            key={ value }
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateX(-13px)",
            }}
          >
          { value }
          </text>
        </g>
      ))}
      
    </g>
  );
};
