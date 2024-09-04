import { useEffect, useRef } from "react";
import uploadStyles from "./uploads.module.css";

interface ModalUpload {
  handleOpenModal(): void;
  errorUpload: string[];
  openModal: boolean;
}

const ModalUpload:React.FC<ModalUpload> = ({ handleOpenModal, errorUpload, openModal }) => {
  const refModal = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (openModal) refModal?.current?.showModal();
    else {
      refModal?.current?.classList?.add(uploadStyles["upload__dialog--out"]);
      setTimeout(() => {
        refModal?.current?.classList?.remove(
          uploadStyles["upload__dialog--out"]
        );
        refModal?.current?.close();
      }, 105);
    }
  }, [openModal]);

  return (
    <dialog ref={refModal} className={`${uploadStyles.upload__dialog}`}>
      <div className={`${uploadStyles.upload__wrapper}`}>
        <div className={`${uploadStyles.upload__dialog__messages}`}>
          {errorUpload.length > 0 &&
            errorUpload.map((ele, ind) => <span key={ind}>{ele}</span>)}
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className={`${uploadStyles.btn} ${uploadStyles["btn--delete"]}`}
            onClick={handleOpenModal}
          >
            Cerrar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ModalUpload;
