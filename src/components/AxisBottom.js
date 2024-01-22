import { useMemo } from "react";
// import { ScaleLinear } from "d3";


export const AxisBottom = ({ xScale, dim, pixelsPerTick, tickLength = 6}) => {
  const range = xScale.range()

  const ticks = useMemo(() => {
    const width = range[1] - range[0]
    const numberOfTicksTarget = Math.floor(width / pixelsPerTick)

    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value: value,
      xOffset: xScale(value),
    }))
  }, [xScale]);

  const yLoc = dim.height - dim.padding.bottom - 13

  return (
    <g>
      {/* Main horizontal line */}
      <path
        d={["M", range[0], yLoc, "L", range[1],yLoc].join(" ")}
        fill="none"
        stroke="currentColor"
      />

      {/* Ticks and labels */}
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, ${yLoc})`}>
          <line y2={tickLength} stroke="currentColor" />
          <text
            key={value}
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
