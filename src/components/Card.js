
const Card = ({ value, label }) => {
  
  return (
    <div className="card">
      <p>{ String(value) }</p>
      <p>{ label }</p>
    </div>
  )
}

export default Card