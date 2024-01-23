
const Card = ({ value, label }) => {
  
  return (
    <div className={"card viz"}>
      <p>{ String(value) }</p>
      <p>{ label }</p>
    </div>
  )
}

export default Card