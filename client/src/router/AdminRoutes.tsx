import PrivateLayout from '../layouts/PrivateLayout';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthProvider';

const AdminRoutes = () => {
  const { sessionAuth } = useAuthContext()
  if (sessionAuth.status)
    return (<PrivateLayout />)
  return <Navigate to={"/login"} />
}

export default AdminRoutes