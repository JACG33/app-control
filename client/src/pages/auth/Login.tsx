import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import formCss from "../../assets/styles/form.module.css";
import Toast from "../../components/notifications/Toast";
import QuestionButton from "../../components/reutilizables/questionpopover/QuestionButton";
import { Eye } from "../../components/svg";
import { API_URL } from "../../constans/api";
import { useAuthContext } from "../../hooks/useAuthProvider";
import authCss from "./auth.module.css";
import {
  type ErrorResponseHttp,
  type LoginResponse,
  type StateError,
} from "../../types/Response.types";

const Login = () => {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<StateError>({
    typeMessage: "",
    messages: [],
  });
  const { setLogged } = useAuthContext();
  const inpPassRef = useRef<HTMLInputElement | null>(null);

  const { postHttp } = useAuthContext();

  const toggleInp = () => {
    if (inpPassRef?.current?.type == "text")
      inpPassRef.current.type = "password";
    if (inpPassRef?.current?.type == "password")
      inpPassRef.current.type = "text";
  };

  const hldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.typeMessage != "") setErrors({ typeMessage: "", messages: [] });
    const { target } = e;
    setLoginForm({
      ...loginForm,
      [target.name]: target.value,
    });
  };

  const hldSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await postHttp({
        endpoint: `${API_URL}/auth/login`,
        body: loginForm,
      });

      if (!res.ok) throw res;

      const json = (await res.json()) as LoginResponse;

      setLogged({
        tokenAccess: json?.body[0].accessToken,
        tokenRefresh: json?.body[0].refreshToken,
        userId: json?.body[0].userData.id_user,
        rol: json?.body[0].userData.user_rol,
        userName: json?.body[0].userData.user_name,
      });
    } catch (error) {
      if (error instanceof Response) {
        const messages = (await error.json()) as ErrorResponseHttp;
        setErrors({
          typeMessage: "error",
          messages: messages.body,
        });
      }
    }

    setTimeout(() => setErrors({ typeMessage: "", messages: [] }), 10000);
  };

  return (
    <div className={authCss.auth}>
      {/* Messages */}
      {errors.typeMessage == "error" && (
        <Toast messageType="error" data={errors.messages} />
      )}
      {errors.typeMessage == "success" && (
        <Toast messageType="success" data={errors.messages} />
      )}
      {/*  */}
      <form className={formCss.form} method="post" onSubmit={hldSubmit}>
        <h2>Iniciar Sesión</h2>

        <div className={formCss.form__div}>
          <div className={formCss.form__div}>
            <label htmlFor="logusername">Usuario</label>
            <input
              className={formCss.form__input}
              type="text"
              id="logusername"
              name="username"
              placeholder="Nombre de usuario"
              value={loginForm.username}
              onChange={hldChange}
            />
          </div>

          <div className={formCss.form__div}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label htmlFor="logpassword">Contraseña</label>

              <QuestionButton
                titleBtn={"Requisitos Contraseña"}
                titleModal={"Requisitos Contraseña"}
              >
                <li>Debe tener almenos una letra Mayuscula.</li>
                <li>Debe tener almenos una letra Minuscula.</li>
                <li>Debe tener almenos un Número.</li>
                <li>Debe tener más de 8 caracteres.</li>
              </QuestionButton>
            </div>

            <div style={{ position: "relative" }}>
              <input
                ref={inpPassRef}
                className={formCss.form__input}
                type="password"
                id="logpassword"
                name="password"
                placeholder="Contraseña"
                value={loginForm.password}
                onChange={hldChange}
              />
              <button
                className={formCss.form__show__eye}
                onClick={toggleInp}
                type="button"
              >
                <Eye />
              </button>
            </div>
          </div>
        </div>

        <div className={formCss.form__area__link}>
          <span>
            No tienes cuenta <Link to={"/signup"}>Registrate</Link>
          </span>
        </div>

        <button
          className={`${formCss.form__button} ${formCss["form__button--save"]}`}
          type="submit"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
