import { useMemo } from "react";
// import { ScaleLinear } from "d3";


export const AxisBottom = ({ xScale, yScale, dim, numberOfTicksTarget, tickLength = 5}) => {

  const ticks = useMemo(() => {
    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value: value,
      xOffset: xScale(value),
    }))
  }, [xScale]);

  const yLoc = dim.height - dim.padding.bottom - 13
  // const yLoc = dim.height - dim.padding.bottom - dim.bottomAxisHeight

  return (
    <g className="bottomAxis">
      {/* Main horizontal line */}
      <path
        d={["M", xScale.range()[0], yLoc, "L", xScale.range()[1], yLoc].join(" ")}
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
      
    </g>
  );
};
