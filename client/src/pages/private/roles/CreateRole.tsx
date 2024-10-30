import { useState } from "react";
import { Navigate } from "react-router-dom";
import formCss from "../../../assets/styles/form.module.css";
import Toast from "../../../components/notifications/Toast";
import { API_URL } from "../../../constans/api";
import { useAuthContext } from "../../../hooks/useAuthProvider";
import { roleCreateSchema } from "../../../schema/role";
import authCss from "./create-user.module.css";
import {  StateError } from "../../../types/Response.types";

interface Role {
  rolname: string;
}

const CreateRole = () => {
  const { postHttp, sessionAuth } = useAuthContext();
  const [rol, setRol] = useState<Role>({ rolname: "" });
  const [errors, setErrors] = useState<StateError>({
    typeMessage: "",
    messages: [],
  });

  const hldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.typeMessage != "") setErrors({ typeMessage: "", messages: [] });
    const { target } = e;
    setRol({
      ...rol,
      [target.name]: target.value,
    });
  };

  const validateForm = ({ data }: { data: { rolname: string } }) => {
    const keys = Object.keys(data) as Array<keyof typeof data>;

    const errors: Array<{ message: string }> = [];

    keys.forEach((key) => {
      const pattern = new RegExp(roleCreateSchema[key].pattern);
      if (data[key] == "" || !data[key].match(pattern)) {
        errors.push({ message: roleCreateSchema[key].message });
      }
    });
    if (errors.length > 0) return errors;
    return [];
  };

  const hldSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validate = validateForm({ data: rol });
    if (validate.length > 0) {
      setErrors({ typeMessage: "error", messages: validate });
      return;
    }

    try {
      const res = await postHttp({ endpoint: `${API_URL}/roles`, body: rol });

      if (!res.ok) throw res;
      const json = await res.json();

      setRol({ rolname: "" });
      setErrors({ typeMessage: "success", messages: json.body[0] });
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
        <h2>Crear Rol</h2>

        <div className={formCss.form__div}>
          <div className={formCss.form__div}>
            <label htmlFor="sigrol">Nombre del Rol</label>
            <input
              className={formCss.form__input}
              type="text"
              id="sigrol"
              name="rolname"
              value={rol.rolname}
              onChange={hldChange}
              placeholder="Nombre del rol"
            />
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

export default CreateRole;
