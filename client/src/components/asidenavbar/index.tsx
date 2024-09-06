import logo from "../../components/img/GifHat.gif";
import { useThemeContex } from "../../hooks/useThemeProvider";
import { ArrowLeft, ArrowRoundedBracket } from "../svg";
import { useAuthContext } from "../../hooks/useAuthProvider";
import { NavLink, Navigate } from "react-router-dom";
import { API_URL } from "../../constans/api";
import CollapseItems from "./CollapseItems";
import ToggleTheme from "./ToggleTheme";

const AsideNavBar = () => {
  const { toggleAside, hldToggleAside } = useThemeContex();

  const { sessionAuth, logUt, deleteHttp } = useAuthContext();

  const hldOut = async (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    try {
      const res = await deleteHttp({
        endpoint: `${API_URL}/auth/logut`,
        body: {},
      });

      if (!res.ok) throw res;

      const json = await res.json();

      if (json.message == "Out") {
        console.log(res);
        logUt();
      }
    } catch (error) {
      console.log(error);
    }

    if (!sessionAuth.status) return <Navigate to={"/login"} />;
  };

  return (
    <aside
      className={`aside__navbar ${toggleAside ? "aside__navbar--open" : ""}`}
    >
      <div className="aside__navbar__top">
        <img src={logo} alt="Logo" className="aside__navbar__logo" />
        <button
          type="button"
          className="aside__navbar__close"
          onClick={hldToggleAside}
        >
          <ArrowLeft />
        </button>
      </div>
      <ul className="aside__navbar__items aside__navbar__items--top">
        <li className={`aside__navbar__item`} title="Inicio">
          <NavLink to={"/"}>Inicio</NavLink>
        </li>
        <li className={`aside__navbar__item`} title="Vision General">
          <NavLink to={"/overview"}>Vision General</NavLink>
        </li>

        {sessionAuth.userRol == "superadmin" && (
          <>
            {/*  */}
            <CollapseItems secctionName={"Usuarios"}>
              <li className={`aside__navbar__item`} title="Usuarios">
                <NavLink to={"/users"}>Usuarios</NavLink>
              </li>
              <li className={`aside__navbar__item`} title="Crear Usuario">
                <NavLink to={"/create-user"}>Crear Usuario</NavLink>
              </li>
            </CollapseItems>
            {/*  */}
            <CollapseItems secctionName={"Roles"}>
              <li className={`aside__navbar__item`} title="Roles">
                <NavLink to={"/roles"}>Roles</NavLink>
              </li>
              <li className={`aside__navbar__item`} title="Crear Rol">
                <NavLink to={"/create-role"}>Crear Rol</NavLink>
              </li>
            </CollapseItems>
            {/*  */}
            <li className={`aside__navbar__item`} title="Archivos">
              <NavLink to={"/uploads"}>Archivos</NavLink>
            </li>
          </>
        )}
        <li className={`aside__navbar__item`} title="Mensajes">
          <NavLink to={"/messages"}>Mensajes</NavLink>
        </li>
      </ul>

      <ul className="aside__navbar__items aside__navbar__items--bottom">
        <li className={`aside__navbar__item`} title="Perfil">
          <NavLink to={"/profile"}>Perfil</NavLink>
        </li>

        <ToggleTheme />

        <li
          className={`aside__navbar__item aside__navbar__item--logut`}
          onClick={hldOut}
          title="Cerrar Sesion"
        >
          <NavLink to={"/logut"}>
            Cerrar Sesion
            <ArrowRoundedBracket />
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default AsideNavBar;
