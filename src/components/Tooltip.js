
export const Tooltip = ({ data, name, pos }) => {
  if (!data) {
    return null;
  }
  return (
    <div
      className={name}
      style={{
        left: pos.x,
        top: pos.y, 
      }}
    >
      { data.name }
    </div>
  )
}

export default Tooltip