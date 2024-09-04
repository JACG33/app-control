import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <div>NtFound</div>
      <Link className="btn btn__send" to={"/"}>Regresar al inicio</Link>
    </div>
  )
}

export default NotFound