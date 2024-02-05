import { useMemo } from "react";
import { ScaleLinear } from "d3";


export const VerticalAxis = ({ yScale, dims, axisLabel, axisPosition="left", numberOfTicksTarget, tickLength = 5}) => {

  const ticks = useMemo(() => {
    return yScale.ticks(numberOfTicksTarget).map((value) => ({
      value: value,
      yOffset: yScale(value),
    }))
  }, [yScale]);

  const axisOffset      = axisPosition=="left" ? dims.padding.left : dims.width - dims.padding.right - dims.padding.left
  const tickXTransform  = axisPosition=="left" ? axisOffset - tickLength : axisOffset + tickLength
  const tickVector      = axisPosition=="left" ? tickLength : -tickLength
  const textTransform   = axisPosition=="left" ? `-10px` : `10px`
  const titleRotate     = axisPosition=="left" ? 270 : 90
  const titleOffset     = axisPosition=="left" ? axisOffset-32 : axisOffset+32

  return (
    <g className={`axis horizontal ${axisPosition}`}>
      {/* Main Axis Line */}
      <path
        d={["M", axisOffset, yScale.range()[0], "L", axisOffset, yScale.range()[1]].join(" ")}
        fill="none"
        stroke="currentColor"
      />

      {/* Ticks and labels */}
      {ticks.map(({ value, yOffset }) => (
        <g key={value} transform={`translate(${tickXTransform}, ${yOffset})`}>
          <line x2={tickVector} stroke="currentColor" />
          <text
            key={ value }
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: `translate(${textTransform}, 2.5px)`,
            }}
          >
          { value }
          </text>
        </g>
      ))}
      

      {/* Axis Label */}
      <g
        transform= {`translate(${titleOffset}, ${(yScale.range()[0])/2})`}
      >
        { axisLabel 
          ? <text
            transform= {`rotate(${titleRotate})`}
            style={{
              fontSize: "10px",
              textAnchor: "middle",  
            }
          }
            >
              {axisLabel}
            </text>
          : <></>
        }
      </g>


    </g>
  );
};
