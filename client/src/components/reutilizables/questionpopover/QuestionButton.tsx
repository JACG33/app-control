import React, { useRef } from "react";
import { QuestionMark, XCircle } from "../../svg";
import questionBtnCss from "./questionbutton.module.css";
// Este codigo es generado no la IA para dar soporte a las propiedades popovertarget, popover
declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    popovertarget?: string;
    popover?: string;
  }
}
interface QuestionButton {
  children: JSX.Element[] | JSX.Element;
  titleBtn: string;
  titleModal: string;
}

const QuestionButton: React.FC<QuestionButton> = ({
  children,
  titleBtn,
  titleModal,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const hldClosePopOver = () => {
    modalRef?.current?.hidePopover();
  };

  return (
    <>
      <button
        className={questionBtnCss.question__button}
        popovertarget="popoverRef"
        type="button"
        title={titleBtn}
      >
        <QuestionMark />
      </button>

      <div
        ref={modalRef}
        className={questionBtnCss.question__modal}
        popover="true"
        id="popoverRef"
      >
        <div className={questionBtnCss.question__modal__header}>
          <h2>{titleModal}</h2>
          <button
            className={questionBtnCss.question__button__close}
            type="button"
            onClick={hldClosePopOver}
          >
            <XCircle />
          </button>
        </div>
        <ul>{children}</ul>
      </div>
    </>
  );
};

export default QuestionButton;
