import { useMemo } from "react";
// import { ScaleLinear } from "d3";


export const Axis = ({ 
  scale, axisPosition,
  dims, axisLabel,
  numberOfTicksTarget, tickLength = 5}) => {

  // const yLoc = dim.height - dim.padding.bottom - dim.bottomAxisHeight
  const axisOrientation = ["left", "right"].includes(axisPosition) ? "vertical" : "horizontal"
  const axisStart = axisOrientation == "vertical" ? scale.range()[1] : scale.range()[0]
  const axisStop = axisOrientation == "vertical" ? scale.range()[1] : scale.range()[0]
  const axisWidth = axisStop - axisStart
  const axisCenter = axisOrientation == "vertical"
    ? dims.padding.top+(axisStop)/2 
    : dims.padding.left+(axisStop)/2
  const axisOffset = {
      "top"    : dims.padding.top,
      "right"  : dims.width - dims.padding.right,
      "bottom" : dims.height - dims.padding.bottom - 13,
      "left"   : dims.padding.left,
    }
  const offsetType = axisOrientation == "horizontal" ? "xOffset" : "yOffset"
  // console.log("o:", axisPosition, ["left", "right"].includes(axisPosition), axisOrientation, offsetType)

  const ticks = useMemo(() => {
    return scale.ticks(numberOfTicksTarget).map((value) => ({
      value: value,
      [offsetType]: scale(value),
    }))
  }, [scale]);
    
  const axisPath = {
    "top"    : ["M", scale.range()[0], axisOffset[axisPosition], "L", scale.range()[1], axisOffset[axisPosition]].join(" "),
    "right"  : ["M", axisOffset[axisPosition], scale.range()[0], "L", axisOffset[axisPosition], scale.range()[1]].join(" "),
    "bottom" : ["M", scale.range()[0], axisOffset[axisPosition], "L", scale.range()[1], axisOffset[axisPosition]].join(" "),
    "left"   : ["M", axisOffset[axisPosition], scale.range()[0], "L", axisOffset[axisPosition], scale.range()[1]].join(" "),
  }

  ticks.map((tick, index)=>{console.log("T:", tick, "V:", tick['value'], "O:", tick[offsetType])})

  return (
    <g className={"axis " + axisPosition}>
      {/* Main horizontal line */}
      <path
        d={axisPath[axisPosition]}
        fill="none"
        stroke="currentColor"
      />

      {/* Ticks and labels */}
      {ticks.map(({ tick, index }) => ( 
          
          <g key={index} transform={`translate(${axisOffset[axisPosition]}, ${tick})`} data={tick}>
          <line x2={-tickLength} stroke="currentColor" />
          <text
            key={ index }
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: `translateY(${ ["left", "right"].includes(axisPosition) ? "-" : "" }20px)`,
            }}
          >
          { tick }
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
