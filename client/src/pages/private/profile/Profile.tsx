import React, { useEffect, useState } from "react";
import Toast from "../../../components/notifications/Toast";
import QuestionButton from "../../../components/reutilizables/questionpopover/QuestionButton";
import { API_URL } from "../../../constans/api";
import { useAuthContext } from "../../../hooks/useAuthProvider";
import { userRegisterSchema } from "../../../schema/user";
import profileCss from "./profile.module.css";
import formCss from "../../../assets/styles/form.module.css";
import { type StateError } from "../../../types/Response.types";
import InputPassword from "../../../components/form-inputs/input-password";

interface LoginForm {
  username: string;
  name: string;
  lastname: string;
  password?: string;
}

const Profile = () => {
  const [userInfo, setUserInfo] = useState<LoginForm>({
    username: "",
    name: "",
    lastname: "",
    password: "",
  });
  const { sessionAuth, getHttp, putHttp } = useAuthContext();
  const [errors, setErrors] = useState<StateError>({
    typeMessage: "",
    messages: [],
  });

  const getInfoUser = async () => {
    try {
      const userId = sessionAuth.userId;

      const res = await getHttp({ endpoint: `${API_URL}/users/${userId}` });

      if (!res.ok) throw res;

      const json = await res.json();

      setUserInfo({
        ...userInfo,
        username: json.result.nombre_usuario,
        name: json.result.nombre,
        lastname: json.result.apellido,
      });
    } catch (error) {
      if (error instanceof Response) {
        const messages = await error.json();
        setErrors({
          typeMessage: "error",
          messages: messages.body,
        });
      }
    }
  };

  const hldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.typeMessage != "") setErrors({ typeMessage: "", messages: [] });
    const { target } = e;
    setUserInfo({
      ...userInfo,
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
      password?: string;
    };
  }) => {
    const keys = Object.keys(data) as Array<keyof typeof data>;

    const errors: Array<{ message: string }> = [];

    keys.forEach((key) => {
      const pattern = new RegExp(userRegisterSchema[key].pattern);
      if (data[key] && !data[key]!.match(pattern)) {
        errors.push({ message: userRegisterSchema[key].message });
      }
    });
    if (errors.length > 0) return errors;
    return [];
  };

  const hldSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tmp = structuredClone(userInfo);

    if (userInfo.password == "") delete tmp.password;

    const validate = validateForm({ data: tmp });
    if (validate.length > 0) {
      setErrors({ typeMessage: "error", messages: validate });
      return;
    }

    try {
      const userId = sessionAuth.userId;
      const res = await putHttp({
        endpoint: `${API_URL}/users/${userId}`,
        body: tmp,
      });

      if (!res.ok) throw res;

      const json = await res.json();

      setErrors({ typeMessage: "success", messages: json.body });
      setTimeout(() => {
        setErrors({ typeMessage: "", messages: [] });
      }, 10000);
    } catch (error) {
      if (error instanceof Response) {
        const messages = await error.json();
        setErrors({
          typeMessage: "error",
          messages: messages.body,
        });
      }
    }

    setTimeout(() => setErrors({ typeMessage: "", messages: [] }), 10000);
  };

  useEffect(() => {
    getInfoUser();
  }, []);

  return (
    <div className={profileCss.profile}>
      {/* Messages */}
      {errors.typeMessage == "error" && (
        <Toast messageType="error" data={errors.messages} />
      )}
      {errors.typeMessage == "success" && (
        <Toast messageType="success" data={errors.messages} />
      )}
      {/*  */}

      <form className={formCss.form} onSubmit={hldSubmit}>
        <h2>Datos Usuario</h2>

        <div className={formCss.form__div}>
          <label htmlFor="username">Usuario</label>
          <input
            className={formCss.form__input}
            type="text"
            id="username"
            name="username"
            value={userInfo.username}
            placeholder="Nombre de usuario"
            onChange={hldChange}
          />
        </div>
        <div className={formCss.form__div}>
          <label htmlFor="name">Nombre</label>
          <input
            className={formCss.form__input}
            type="text"
            id="name"
            name="name"
            value={userInfo.name}
            placeholder="Nombre"
            onChange={hldChange}
          />
        </div>
        <div className={formCss.form__div}>
          <label htmlFor="lastname">Apellido</label>
          <input
            className={formCss.form__input}
            type="text"
            id="lastname"
            name="lastname"
            value={userInfo.lastname}
            placeholder="Apellido"
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
            <label htmlFor="password">Nueva Contraseña</label>

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
          <InputPassword
            className={formCss.form__input}
            type="password"
            id="password"
            name="password"
            value={userInfo.password}
            placeholder="Nueva contraseña"
            onChange={hldChange}
          />
        </div>
        <button
          className={`${formCss.form__button} ${formCss["form__button--save"]}`}
          type="submit"
        >
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default Profile;
