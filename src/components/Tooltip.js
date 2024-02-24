
export const Tooltip = ({ data, name }) => {
  if (!data) {
    return null;
  }

  return (
    <div
      className={"tooltip"}
      style={{
        left: data['xPos'],
        top: data['xPos'], 
      }}
    >
      { "x" }
    </div>
  )
}

export default Tooltip