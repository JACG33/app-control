import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../../components/notifications/Toast";
import QuestionButton from "../../components/reutilizables/questionpopover/QuestionButton";
import { Eye } from "../../components/svg";
import { API_URL } from "../../constans/api";
import { userRegisterSchema } from "../../schema/user";
import authCss from "./auth.module.css";
import formCss from "../../assets/styles/form.module.css";
import {
  type ErrorResponseHttp,
  type StateError,
} from "../../types/Response.types";
import { useAuthContext } from "../../hooks/useAuthProvider";

interface LoginForm {
  username: string;
  name: string;
  lastname: string;
  password: string;
}
const Signup = () => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: "",
    name: "",
    lastname: "",
    password: "",
  });
  const [errors, setErrors] = useState<StateError>({
    typeMessage: "",
    messages: [],
  });
  const navigate = useNavigate();
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

  const validateForm = ({
    data,
  }: {
    data: {
      username: string;
      name: string;
      lastname: string;
      password: string;
    };
  }) => {
    const keys = Object.keys(data) as Array<keyof typeof data>;

    const errors: { message: string }[] = [];

    keys.forEach((key) => {
      const pattern = new RegExp(userRegisterSchema[key].pattern);
      if (!data[key].match(pattern)) {
        errors.push({ message: userRegisterSchema[key].message });
      }
    });
    if (errors.length > 0) return errors;
    return [];
  };

  const hldSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validate = validateForm({ data: loginForm });
    if (validate.length > 0) {
      setErrors({ typeMessage: "error", messages: validate });
      return;
    }

    try {
      const res = await postHttp({
        endpoint: `${API_URL}/auth/register`,
        body: loginForm,
      });

      if (!res.ok) throw await res.json();
      const json = (await res.json()) as ErrorResponseHttp;

      setErrors({ typeMessage: "success", messages: json.body });

      return navigate("/login");
    } catch (error) {
      if (error instanceof Response) {
        const messages = (await error.json()) as ErrorResponseHttp;
        setErrors({
          typeMessage: "error",
          messages: messages.body,
        });
      }
    }
    setTimeout(() => setErrors({ typeMessage: "error", messages: [] }), 10000);
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
        <h2>Registrarse</h2>

        <div className={formCss.form__div}>
          <div className={formCss.form__div}>
            <label htmlFor="sigusername">Nombre de Usuario</label>
            <input
              className={formCss.form__input}
              type="text"
              id="sigusername"
              name="username"
              value={loginForm.username}
              onChange={hldChange}
              placeholder="Nombre de usuario"
            />
          </div>

          <div className={formCss.form__div}>
            <label htmlFor="signame">Nombre</label>
            <input
              className={formCss.form__input}
              type="text"
              id="signame"
              name="name"
              value={loginForm.name}
              onChange={hldChange}
              placeholder="Nombre"
            />
          </div>

          <div className={formCss.form__div}>
            <label htmlFor="siglastname">Apellido</label>
            <input
              className={formCss.form__input}
              type="text"
              id="siglastname"
              name="lastname"
              value={loginForm.lastname}
              onChange={hldChange}
              placeholder="Apellido"
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
              <label htmlFor="sigpassword">Contraseña</label>

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
                id="sigpassword"
                name="password"
                value={loginForm.password}
                placeholder="Contraseña"
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

        <div className={authCss.area__link}>
          <span>
            Ya tienes cuenta <Link to={"/login"}>Inicia Sesion</Link>
          </span>
        </div>

        <button
          className={`${formCss.form__button} ${formCss["form__button--save"]}`}
          type="submit"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Signup;
