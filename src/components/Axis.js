import { useMemo } from "react";
// import { ScaleLinear } from "d3";


export const AxisBottom = ({ 
  scale, axisOrientation,
  dims, axisLabel,
  numberOfTicksTarget, tickLength = 5}) => {

  const ticks = useMemo(() => {
    return scale.ticks(numberOfTicksTarget).map((value) => ({
      value: value,
      xOffset: scale(value),
    }))
  }, [scale]);

  // const yLoc = dim.height - dim.padding.bottom - dim.bottomAxisHeight
  const axisStart = axisOrientation in ["left", "right"] ? scale.range()[1] : scale.range()[0]
  const axisStop = axisOrientation in ["left", "right"] ? scale.range()[1] : scale.range()[0]
  const axisWidth = axisStop - axisStart
  const axisCenter = axisOrientation in ["left", "right"] 
    ? dims.padding.top+(axisStop)/2 
    : dims.padding.left+(axisStop)/2
  const axisOffset = {
      "top"    : dims.padding.top,
      "right"  : dims.width - dims.padding.right,
      "bottom" : dims.height - dims.padding.bottom - 13,
      "left"   : dims.padding.left,
    }

    // axisOrientation in ["left", "right"] 
    // ? dims.padding.left
    // : dims.height - dims.padding.bottom - 13
  const axisPath = {
    "top"    : ["M", scale.range()[0], axisOffset, "L", scale.range()[1], axisOffset].join(" "),
    "right"  : ["M", scale.range()[0], axisOffset, "L", scale.range()[1], axisOffset].join(" "),
    "bottom" : ["M", scale.range()[0], axisOffset, "L", scale.range()[1], axisOffset].join(" "),
    "left"   : ["M", scale.range()[0], axisOffset, "L", scale.range()[1], axisOffset].join(" "),
  }
  return (
    <g className={"axis " + axisOrientation}>
      {/* Main horizontal line */}
      <path
        d={axisPath}
        fill="none"
        stroke="currentColor"
      />

      {/* Ticks and labels */}
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, ${axisOffset})`}>
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
        transform= {`translate(${axisCenter}, ${axisOffset + 35})`}
      >
        { axisLabel 
          ? <text
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: `translate(${axisCenter}, ${axisOffset})`,
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
