import { Link } from 'react-router-dom'

const UnAuthtorize = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100dvh", flexDirection: "column" }}>
      <h3>403</h3>
      <p>No tines persmisos para acceder a esta seccion</p>
      <Link to={"/overview"}>Regresar</Link>
    </div>
  )
}

export default UnAuthtorize