import { NavLink, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthProvider";
import { API_URL } from "../constans/api";

const NavBar = () => {
  const { sessionAuth, logUt } = useAuthContext();

  const hldOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/auth/logut`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      });

      if (!res.ok) throw await res.json();

      const json = await res.json();

      if (json.message == "Out") {
        console.log(res);
        logUt();
      }
    } catch (error) {
      console.log(error);
    }

    if (!sessionAuth.status) return <Navigate to={"/"} />;
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div
        style={{ width: "80px", height: "80px", backgroundColor: "purple" }}
      ></div>

      <ul
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          listStyle: "none",
        }}
      >
        <li>
          <NavLink to={"/"}>Inicio</NavLink>
        </li>
        {!sessionAuth.status && (
          <>
            <li>
              <NavLink to={"/login"}>Inicia Sesion</NavLink>
            </li>
            <li>
              <NavLink to={"/signup"}>Registrate</NavLink>
            </li>
          </>
        )}
        {sessionAuth.status && (
          <>
            <li>
              <NavLink to={"/profile"}>Perfil</NavLink>
            </li>
            <li>
              <NavLink onClick={hldOut} to={"/logut"}>
                Logut
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
