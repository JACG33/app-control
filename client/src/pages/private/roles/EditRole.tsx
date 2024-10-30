import { useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate, useParams } from "react-router-dom";
import Toast from "../../../components/notifications/Toast";
import { API_URL } from "../../../constans/api";
import { useAuthContext } from "../../../hooks/useAuthProvider";
import profileCss from "../profile/profile.module.css";
import formCss from "../../../assets/styles/form.module.css";
import { roleCreateSchema } from "../../../schema/role";
import {
  type StateError,
} from "../../../types/Response.types";

interface Role {
  rolname: string;
}

const EditRole = () => {
  const [roleInfo, setRoleInfo] = useState<Role>({ rolname: "" });
  const [errors, setErrors] = useState<StateError>({
    typeMessage: "",
    messages: [],
  });
  const { sessionAuth, getHttp, putHttp } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const getInfoRole = async () => {
    try {
      const roleId = id;
      const res = await getHttp({ endpoint: `${API_URL}/roles/${roleId}` });

      if (!res.ok) throw res;
      const json = await res.json();

      setRoleInfo({
        ...roleInfo,
        rolname: json.body.role_name,
      });
    } catch (error) {
      if (error instanceof Response) {
        const messages = await error.json();
        setErrors({
          typeMessage: "error",
          messages: messages.body,
        });
        setTimeout(() => {
          setErrors({ typeMessage: "", messages: [] });
        }, 10000);
      }
    }
  };

  const hldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.typeMessage != "") setErrors({ typeMessage: "", messages: [] });
    const { target } = e;
    setRoleInfo({
      ...roleInfo,
      [target.name]: target.value,
    });
  };

  const validateForm = ({ data }: { data: { rolname: string } }) => {
    const keys = Object.keys(data) as Array<keyof typeof data>;
    const errors: Array<{ message: string }> = [];
    keys.forEach((key) => {
      const pattern = new RegExp(roleCreateSchema[key].pattern);
      if (!data[key].match(pattern)) {
        errors.push({ message: roleCreateSchema[key].message });
      }
    });
    if (errors.length > 0) return errors;
    return [];
  };

  const hldSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tmp = structuredClone(roleInfo);

    const validate = validateForm({ data: tmp });
    if (validate.length > 0) {
      setErrors({ typeMessage: "error", messages: validate });
      return;
    }

    try {
      const roleId = id;
      const res = await putHttp({
        endpoint: `${API_URL}/roles/${roleId}`,
        body: tmp,
      });

      if (!res.ok) throw res;
      const json = await res.json();

      setErrors({ typeMessage: "success", messages: json.body[0] });
      setTimeout(() => {
        setErrors({ typeMessage: "", messages: [] });
        navigate("/roles");
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
    getInfoRole();
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
          <label htmlFor="rolname">Usuario</label>
          <input
            className={formCss.form__input}
            type="text"
            id="rolname"
            name="rolname"
            value={roleInfo.rolname}
            placeholder="Nombre del rol"
            onChange={hldChange}
          />
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
            to={"/roles"}
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

export default EditRole;
