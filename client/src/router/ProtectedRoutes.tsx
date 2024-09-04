import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthProvider';

const ProtectedRoutes = ({ children }:{children:JSX.Element|JSX.Element[]}) => {
  const { sessionAuth } = useAuthContext()
  if (sessionAuth.status) return <Navigate to={"/"} />;
  return children ? children : <Outlet />;

}

export default ProtectedRoutes