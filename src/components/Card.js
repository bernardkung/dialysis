
const Card = ({ value, label }) => {
  
  return (
    <div className={"card viz"}>
      <p>{ String(value) }</p>
      <p className={"vizTitle"}>{ label }</p>
    </div>
  )
}

export default Card