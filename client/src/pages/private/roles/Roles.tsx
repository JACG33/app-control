import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Toast from "../../../components/notifications/Toast";
import { API_URL } from "../../../constans/api";
import { useAuthContext } from "../../../hooks/useAuthProvider";
import Table from "./Table";
import modalStyles from "../../../assets/styles/modals.module.css";
import { StateError } from "../../../types/Response.types";

interface Data {
  id: string;
  role_name: string;
}

interface Pagination {
  firstPage?: string;
  prevPage?: string;
  nextPage?: string;
  lastPage?: string;
  baseUrl?: string;
  limit?: number;
  totalRecords?: number;
  totalPage?: number;
  currentNumberPage?: number;
}

interface UsersInfo {
  data: Data[];
  pagination: Pagination;
}

interface ResData {
  body?: Data[];
  message?: string;
  pagination?: Pagination;
  error?: string;
}

const Roles = () => {
  const [roles, setRoles] = useState<UsersInfo>({ data: [], pagination: {} });
  const { getHttp, sessionAuth, deleteHttp } = useAuthContext();
  const [errors, setErrors] = useState<StateError>({
    typeMessage: "",
    messages: [],
  });
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const userId = useRef<string>("");

  const getRoles = async () => {
    try {
      const res = await getHttp({ endpoint: `${API_URL}/roles` });
      if (!res.ok) throw res;

      const json = (await res.json()) as ResData;
      if (json.body && json.pagination)
        setRoles({ data: json.body, pagination: json.pagination });
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

  const hldCloseModal = () => {
    modalRef?.current?.classList.add(modalStyles["modal--out"]);
    setTimeout(() => {
      modalRef?.current?.classList.remove(modalStyles["modal--out"]);
      modalRef?.current?.close();
    }, 105);
  };

  const deleteUser = async () => {
    try {
      const res = await deleteHttp({
        endpoint: `${API_URL}/roles/${userId.current}`,
        body: {},
      });
      if (!res.ok) throw res;
      console.log(res);

      const json = await res.json();

      getRoles();
      setErrors({ typeMessage: "success", messages: json.body });
      modalRef?.current?.close();

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

      setTimeout(() => {
        setErrors({ typeMessage: "", messages: [] });
      }, 10000);
    }
  };

  const hldEdit = (id: string) => {
    navigate(`/edit-role/${id}`);
  };

  const hldDelete = (id: string) => {
    userId.current = id;
    modalRef?.current?.showModal();
  };

  useEffect(() => {
    getRoles();
  }, []);

  if (sessionAuth.userRol == "user") return <Navigate to="/403" />;

  return (
    <div>
      {/* Messages */}
      {errors.typeMessage == "error" && (
        <Toast messageType="error" data={errors.messages} />
      )}
      {errors.typeMessage == "success" && (
        <Toast messageType="success" data={errors.messages} />
      )}
      {/*  */}
      <h2>roles</h2>

      <div>
        {roles.data.length == 0 && <span>Sis Usuarios</span>}

        {roles.data.length > 0 && (
          <Table
            hldDelete={hldDelete}
            hldEdit={hldEdit}
            body={roles.data}
            pagination={roles.pagination}
            header={["Rol", "Acciones"]}
          />
        )}
      </div>

      <dialog ref={modalRef} className={modalStyles.modal}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className={modalStyles.body__wrapper__modal}>
            <span>¿Estas seguro de Eliminar este usuario?</span>
          </div>
          <div className={modalStyles.btns__wrapper__modal}>
            <button
              className={`${modalStyles.btn__modal} ${modalStyles["btn__modal__blue--border"]}`}
              onClick={deleteUser}
            >
              Si
            </button>
            <button
              className={`${modalStyles.btn__modal} ${modalStyles["btn__modal__red"]}`}
              onClick={hldCloseModal}
            >
              No
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Roles;
