import { useEffect, useRef, useState } from "react";
import { useMessageContext } from "../../../hooks/useMessageProvider";

interface MessageRight {
  content: string;
  autor: string;
  time: string;
  rawData?: {
    message: string;
    id: number;
    autor: { id: number; username: string };
    time: string;
  };
}

const MessageRight = ({
  content = "",
  autor = "",
  time = "",
  rawData,
}: MessageRight) => {
  const { messageActions, hdlMessageActions } = useMessageContext();
  const [selectedMsg, setSelectedMsg] = useState(false);
  const timeout = useRef<number>(0);

  const hdlStarTimeToActions = () => {
    timeout.current = setTimeout(() => {
      console.log("down");
      hdlMessageActions({
        open: !messageActions.open,
        ids: [...messageActions.ids],
      });
    }, 700);
  };

  const hdlEndTimeToActions = () => {
    console.log("clear");
    clearTimeout(timeout.current);
  };

  /**
   * Funcion que marca o no un mensaje como elegido e incluir o no la id de ese mensaje en el estado del context del MensajeProvider.
   * @param {Object} opc Objecto de parametros
   * @param {Number} opc.id Identificador del mensaje.
   */
  const hdlAddSelectedMsg = ({ id }: { id: number }) => {
    if (messageActions.open) {
      let cloneIdsMessages = structuredClone(messageActions.ids);
      if (!selectedMsg) {
        setSelectedMsg(true);
        cloneIdsMessages.push(id);
      } else {
        setSelectedMsg(false);
        cloneIdsMessages = cloneIdsMessages.filter((ele) => ele != id);
      }

      hdlMessageActions({ open: messageActions.open, ids: cloneIdsMessages });
    }
  };

  useEffect(() => {
    if (messageActions.open == false) {
      setSelectedMsg(false);
    }
  }, [messageActions.open]);

  return (
    <>
      <div
        className={`message--right ${selectedMsg ? "message--selected" : ""}`}
        onMouseDown={hdlStarTimeToActions}
        onMouseUp={hdlEndTimeToActions}
        onClick={() => {
          if (rawData?.id) hdlAddSelectedMsg({ id: rawData?.id });
        }}
      >
        <div className="message">
          <div className="message__header">
            <span>{autor}</span>
          </div>
          <p>{content}</p>
          <div className="message__time">
            <small>{new Date(time).toLocaleTimeString()}</small>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageRight;
