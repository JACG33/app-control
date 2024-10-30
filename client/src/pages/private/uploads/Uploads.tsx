import { useEffect, useRef, useState } from "react";
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader } from "../../../components/Loader/Loader";
import Toast from "../../../components/notifications/Toast";
import { IMG_PlACEHOLDER, acceptedFiles } from "../../../config/constans";
import { API_URL } from "../../../constans/api";
import { SliceTextExtensionFile } from "../../../helpers/strings";
import { useAuthContext } from "../../../hooks/useAuthProvider";
import { StateError } from "../../../types/Response.types";
import { Files, FileStorage } from "../../../types/Uploads.types";
import ModalUpload from "./ModalUpload";
import uploadStyles from "./uploads.module.css";

let filesToUpload;
let tmpFiles: Files[] = [];

const Uploads = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { pathname } = useLocation();
  const [fileStorage, setFileStorage] = useState<FileStorage>({
    image: [],
    docs: [],
    zips: [],
  });
  const [typeFileAccept, setTypeFileAccept] = useState(acceptedFiles);
  const [loading, setLoading] = useState(false);
  const [errorUpload, setErrorUpload] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const { getHttp, postHttp, deleteHttp, sessionAuth } = useAuthContext();
  const [errors, setErrors] = useState<StateError>({
    typeMessage: "",
    messages: [],
  });

  const handleOpenModal = () => {
    if (openModal) setErrorUpload([]);
    setOpenModal(!openModal);
  };

  const handleFile = () => fileRef?.current?.click();

  const hdlAcceptFile = ({ type = "" }) => {
    if (type == "documents")
      setTypeFileAccept({ accept: "application/pdf", type: "docs" });

    if (type == "zips")
      setTypeFileAccept({ accept: "application/, .zip, .rar", type: "zips" });

    if (type == "images")
      setTypeFileAccept({
        accept: "image/, .jpeg, .jpg, .png, .gif",
        type: "image",
      });
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files as FileList;
    const tmpErros: string[] = [];
    filesToUpload = Array.from(file);
    if (file.length >= 1) {
      setLoading(true);
      filesToUpload.forEach((file, ind) => {
        if (file.size > 1572864) {
          tmpErros.push(
            `El archivo ${file.name} supera los 1.5 MB y no podra ser subido`
          );
        }
        tmpFiles.push({
          id: ind,
          path: IMG_PlACEHOLDER,
          nameFile: file.name,
          typeFile: "image",
          sizeFile: { small: URL.createObjectURL(file) },
          nameFileSlice: SliceTextExtensionFile(file.name),
        });
      });
      if (tmpErros.length === 0) return saveFile({ filesToUpload });
      handleError(tmpErros);
      setLoading(false);
      if (fileRef.current) fileRef.current.files = new DataTransfer().files;
      tmpFiles = [];
    }
  };

  const handleError = (name: string[]) => setErrorUpload(name);

  /**
   * Funcion que realiza modificaciones de estado de acuerdo a la accion que se quiera.
   * @param {String} action Accion a realizar.
   * @param {String} type Tipo de archivo.
   * @param {String|Number} id Identificador.
   */
  const actionsOfModifyFiles = (
    action: string,
    type: keyof typeof fileStorage,
    id?: string | number | null
  ) => {
    if (action === "delete") {
      const deleteFile = fileStorage[type].filter((ele) => ele.id !== id);
      setFileStorage({
        ...fileStorage,
        [type]: deleteFile,
      });
    }
    if (action === "save") {
      setFileStorage({
        ...fileStorage,
        [type]: [...tmpFiles.reverse(), ...fileStorage[type]],
      });
      tmpFiles = [];
    }
  };

  /**
   * Funcion que solicita guardar un/varios archivos.
   * @param {Object} opc Objeto de opciones.
   * @param {Array} opc.filesToUpload Array de Files
   */
  const saveFile = async ({
    filesToUpload = [],
  }: {
    filesToUpload: Array<File>;
  }) => {
    const form = new FormData();

    filesToUpload.forEach((ele) => {
      form.append("file", ele);
    });

    console.log(filesToUpload);

    try {
      const res = await postHttp({
        endpoint: `${API_URL}/uploads`,
        body: form,
        files: true,
      });

      if (!res.ok) throw res;

      const json = await res.json();

      tmpFiles = tmpFiles.map((ele, ind) => ({
        ...ele,
        id: json.file[ind].id,
        path: json.file[ind].path,
        sizeFile: json.file[ind].sizeFile,
      }));

      actionsOfModifyFiles(
        "save",
        typeFileAccept.type as keyof typeof fileStorage
      );
      if (fileRef.current) fileRef.current.files = new DataTransfer().files;

      setErrors({ typeMessage: "success", messages: json.body });
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
    setLoading(false);
  };

  /**
   * Funcion que solicita eliminar un elemento.
   * @param {String|Number} id Identificador del elemento a eliminar.
   * @returns Promise
   */
  const deleteFile = async (id: string | number) => {
    const json = await deleteHttp({
      endpoint: `${API_URL}/uploads/${id}`,
      moreheaders: { "x-type-file": typeFileAccept.type },
      body: {},
    });
    actionsOfModifyFiles(
      "delete",
      typeFileAccept.type as keyof typeof fileStorage,
      id
    );
    setLoading(false);
    return Promise.resolve(json);
  };

  const getFiles = async () => {
    const res = await getHttp({
      endpoint: `${API_URL}/uploads`,
      moreheaders: { "x-type-file": typeFileAccept.type },
    });

    if (res.ok) {
      const json = await res.json();

      const data = json.body.map((ele: Files) => ({
        ...ele,
        nameFileSlice: SliceTextExtensionFile(ele.nameFile),
      }));
      setFileStorage({ ...fileStorage, [typeFileAccept.type]: data });
    }
  };

  useEffect(() => {
    if (pathname === "/uploads/pdf") hdlAcceptFile({ type: "documents" });

    if (pathname === "/uploads/comprimidos") hdlAcceptFile({ type: "zips" });

    if (pathname === "/uploads/imagenes") hdlAcceptFile({ type: "images" });

    if (errorUpload.length > 0) handleOpenModal();
  }, [pathname, errorUpload]);

  if (sessionAuth.userRol == "user") return <Navigate to="/403" />;

  if (pathname === "/uploads") return <Navigate to={"/uploads/imagenes"} />;

  return (
    <div className={uploadStyles.section__upload}>
      <ModalUpload
        errorUpload={errorUpload}
        handleOpenModal={handleOpenModal}
        openModal={openModal}
      />

      {/* Messages */}
      {errors.typeMessage == "error" && (
        <Toast messageType="error" data={errors.messages} />
      )}
      {errors.typeMessage == "success" && (
        <Toast messageType="success" data={errors.messages} />
      )}
      {/*  */}

      <div className="py-5">
        <input
          type="file"
          name=""
          id="hiddenfile"
          ref={fileRef}
          hidden
          accept={typeFileAccept.accept}
          onChange={handleChangeFile}
          multiple
        />

        <button
          type="button"
          className={`${uploadStyles.btn} ${uploadStyles["btn--edit"]}`}
          onClick={handleFile}
        >
          Añadir Archivo
        </button>
      </div>

      <div className={`${uploadStyles.section__upload__area}`}>
        {/* Tab Buttons */}
        <div className={`${uploadStyles.section__upload__tabs}`}>
          <NavLink
            to={"/uploads/imagenes"}
            className={`${uploadStyles.section__upload__tab}`}
            onClick={() => hdlAcceptFile({ type: "images" })}
          >
            Imagenes
          </NavLink>
          <NavLink
            to={"pdf"}
            className={`${uploadStyles.section__upload__tab}`}
            onClick={() => hdlAcceptFile({ type: "documents" })}
          >
            PDF
          </NavLink>
          <NavLink
            to={"comprimidos"}
            className={`${uploadStyles.section__upload__tab}`}
            onClick={() => hdlAcceptFile({ type: "zips" })}
          >
            Archivos Comprimidos
          </NavLink>
        </div>

        {loading && <Loader css={"fixed inset-0 z-10 bg-[#00000070]"} />}

        {/* Content */}
        {
          <Outlet
            context={{
              deleteFile,
              getFiles,
              setLoading,
              typeFileAccept,
              fileStorage,
            }}
          />
        }
      </div>
    </div>
  );
};

export default Uploads;
