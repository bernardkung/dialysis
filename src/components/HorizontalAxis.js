import { useMemo } from "react";
import * as d3 from "d3";


export const HorizontalAxis = ({ xScale, dims, axisLabel, axisPosition="bottom", numberOfTicksTarget, tickLength = 5}) => {

  const ticks = useMemo(() => {
    return xScale.ticks(numberOfTicksTarget).map((value) => ({
        value: value instanceof Date ? d3.utcFormat("%Y")(value) : value,
        xOffset: xScale(value),
      }
    ))
  }, [xScale]);

  const axisOffset      = axisPosition=="bottom" ? dims.height - dims.padding.bottom - 13 : dims.padding.top
  const tickYTransform  = axisPosition=="bottom" ? axisOffset - tickLength : axisOffset + tickLength
  const tickVector      = axisPosition=="bottom" ? tickLength : -tickLength
  const textTransform   = axisPosition=="bottom" ? `18px` : `-12px`
  const titleOffset     = axisPosition=="bottom" ? axisOffset+32 : axisOffset-32


  return (
    <g className={`axis horizontal ${axisPosition}`}>
      {/* Main horizontal line */}
      <path
        d={["M", xScale.range()[0], axisOffset, "L", xScale.range()[1], axisOffset].join(" ")}
        fill="none"
        stroke="currentColor"
      />

      {/* Ticks and labels */}
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, ${axisOffset})`}>
          <line y2={tickVector} stroke="currentColor" />
          <text
            key={ value }
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: `translateY(${textTransform})`,
            }}
          >
          { value }
          </text>
        </g>
      ))}
      
      {/* Axis Label */}
      <g
        transform= {`translate(${dims.padding.left+(xScale.range()[1])/2}, ${axisOffset + 35})`}
      >
        { axisLabel 
          ? <text
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: `translate(${(xScale.range()[1])/2}, ${titleOffset})`,
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
