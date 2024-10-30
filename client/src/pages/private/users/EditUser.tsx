import React, { useEffect, useRef, useState } from "react";
import { NavLink, Navigate, useNavigate, useParams } from "react-router-dom";
import Toast from "../../../components/notifications/Toast";
import QuestionButton from "../../../components/reutilizables/questionpopover/QuestionButton";
import { Eye } from "../../../components/svg";
import { API_URL } from "../../../constans/api";
import { useAuthContext } from "../../../hooks/useAuthProvider";
import { userCreateSchema } from "../../../schema/user";
import profileCss from "../profile/profile.module.css";
import formCss from "../../../assets/styles/form.module.css";
import { StateError } from "../../../types/Response.types";

interface RoleUser {
  id: number;
  role_name: string;
}

interface LoginForm {
  username: string;
  name: string;
  lastname: string;
  password?: string;
  role: string;
}

const EditUser = () => {
  const [userInfo, setUserInfo] = useState<LoginForm>({
    username: "",
    name: "",
    lastname: "",
    password: "",
    role: "",
  });
  const [roles, setRoles] = useState<RoleUser[]>([]);
  const [errors, setErrors] = useState<StateError>({
    typeMessage: "",
    messages: [],
  });
  const { sessionAuth, getHttp, putHttp } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const inpPassRef = useRef<HTMLInputElement | null>(null);

  const toggleInp = () => {
    if (inpPassRef?.current?.type == "text")
      inpPassRef.current.type = "password";
    if (inpPassRef?.current?.type == "password")
      inpPassRef.current.type = "text";
  };

  const getRoles = async () => {
    try {
      const res = await getHttp({ endpoint: `${API_URL}/roles` });

      if (!res.ok) throw res;
      const json = await res.json();

      setRoles(json.body);
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

  const getInfoUser = async () => {
    try {
      const userId = id;
      const res = await getHttp({ endpoint: `${API_URL}/users/${userId}` });

      if (!res.ok) throw res;
      const json = await res.json();

      setUserInfo({
        ...userInfo,
        username: json.result.nombre_usuario,
        name: json.result.nombre,
        lastname: json.result.apellido,
        role: `${json.result.Role.id}`,
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

  const hldChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
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
      role: string;
    };
  }) => {
    const keys = Object.keys(data) as Array<keyof typeof data>;
    const errors: { message: string }[] = [];
    keys.forEach((key) => {
      const pattern = new RegExp(userCreateSchema[key].pattern);
      if (data[key] && !data[key]!.match(pattern)) {
        errors.push({ message: userCreateSchema[key].message });
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
      const userId = id;
      const res = await putHttp({
        endpoint: `${API_URL}/users/${userId}`,
        body: tmp,
      });

      if (!res.ok) throw res;
      const json = await res.json();

      setErrors({ typeMessage: "success", messages: json.body });
      setTimeout(() => {
        setErrors({ typeMessage: "", messages: [] });
        navigate("/users");
      }, 3000);
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
    // Cargar Informacion del Usurio y los Roles existentes
    getInfoUser();
    getRoles();
  }, []);

  if (sessionAuth.userRol == "user") return <Navigate to="/403" />;

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
        <h2>Editar Usuario</h2>

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
          <div style={{ position: "relative" }}>
            <input
              ref={inpPassRef}
              className={formCss.form__input}
              type="password"
              id="password"
              name="password"
              value={userInfo.password}
              placeholder="Nueva contraseña"
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

        <div className={formCss.form__div}>
          <label htmlFor="role">Rol de Usuario</label>
          <select
            className={formCss.form__input}
            name="role"
            id="role"
            value={userInfo.role}
            onChange={hldChange}
          >
            <option value=""></option>
            {roles.length > 0 &&
              roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.role_name}
                </option>
              ))}
          </select>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <NavLink
            className={`${formCss.form__button} ${formCss["form__button--back"]}`}
            to={"/users"}
          >
            Cancelar
          </NavLink>
          <button
            className={`${formCss.form__button} ${formCss["form__button--save"]}`}
            type="submit"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
