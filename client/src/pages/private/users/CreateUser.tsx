import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import Toast from "../../../components/notifications/Toast";
import QuestionButton from "../../../components/reutilizables/questionpopover/QuestionButton";
import { Eye } from "../../../components/svg";
import { API_URL } from "../../../constans/api";
import { useAuthContext } from "../../../hooks/useAuthProvider";
import { userCreateSchema } from "../../../schema/user";
import authCss from "./create-user.module.css";
import formCss from "../../../assets/styles/form.module.css";
import { ErrorResponseHttp, StateError } from "../../../types/Response.types";

interface RoleUser {
  id: number;
  role_name: string;
}

const CreateUser = () => {
  const { getHttp, postHttp, sessionAuth } = useAuthContext();
  const [user, setUser] = useState({
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
        const messages = (await error.json()) as ErrorResponseHttp;
        setErrors({
          typeMessage: "error",
          messages: messages.body,
        });
      }
    }
  };

  const hldChange = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
    if (errors.typeMessage != "") setErrors({ typeMessage: "", messages: [] });
    const { target } = e;
    setUser({
      ...user,
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
      role: string;
    };
  }) => {
    const keys = Object.keys(data) as Array<keyof typeof data>;

    const errors: { message: string }[] = [];

    keys.forEach((key) => {
      const pattern = new RegExp(userCreateSchema[key].pattern);
      if (data[key] == "" || !data[key].match(pattern)) {
        errors.push({ message: userCreateSchema[key].message });
      }
    });
    if (errors.length > 0) return errors;
    return [];
  };

  const hldSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validate = validateForm({ data: user });
    if (validate.length > 0) {
      setErrors({ typeMessage: "error", messages: validate });
      return;
    }

    try {
      const res = await postHttp({ endpoint: `${API_URL}/users`, body: user });

      if (!res.ok) throw res;
      const json = await res.json();

      setUser({ username: "", name: "", lastname: "", password: "", role: "" });
      setErrors({ typeMessage: "success", messages: json.body[0] });
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

  useEffect(() => {
    getRoles();
  }, []);

  if (sessionAuth.userRol == "user") return <Navigate to="/403" />;

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
        <h2>Registrar Usuario</h2>

        <div className={formCss.form__div}>
          <div className={formCss.form__div}>
            <label htmlFor="sigusername">Nombre de Usuario</label>
            <input
              className={formCss.form__input}
              type="text"
              id="sigusername"
              name="username"
              value={user.username}
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
              value={user.name}
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
              value={user.lastname}
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
                value={user.password}
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
              value={user.role}
              onChange={(e) => hldChange(e)}
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
        </div>

        <button
          className={`${formCss.form__button} ${formCss["form__button--save"]}`}
          type="submit"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
