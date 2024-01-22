import { useMemo } from "react";
import { ScaleLinear } from "d3";


export const AxisLeft = ({ yScale, pixelsPerTick, width, tickLength = 6 }) => {
  const range = yScale.range();

  const ticks = useMemo(() => {
    const height = range[0] - range[1];
    // const numberOfTicksTarget = Math.floor(height / pixelsPerTick);
    const numberOfTicksTarget = 5

    return yScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [yScale]);

  return (
    <>
      {/* Ticks and labels */}
      {ticks.map(({ value, yOffset }) => (
        <g
          key={value}
          transform={"translate(0, {yOffset})"} // TODO struggling with back ticks
          shapeRendering={"crispEdges"}
        >
          <line
            x1={-tickLength}
            x2={width + tickLength}
            stroke="#D2D7D3"
            strokeWidth={0.5}
          />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateX(-20px)",
              fill: "#D2D7D3",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};