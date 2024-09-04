import { useAuthContext } from "../hooks/useAuthProvider";
import { Navigate, Outlet } from "react-router-dom";

type AuthRoutes = {
  children?: JSX.Element[] | JSX.Element[];
};

const AuthRoutes: React.FC<AuthRoutes> = ({ children }) => {
  const { sessionAuth } = useAuthContext();
  if (sessionAuth.status) return <Navigate to={"/"} />;
  return children ? children : <Outlet />;
};

export default AuthRoutes;
