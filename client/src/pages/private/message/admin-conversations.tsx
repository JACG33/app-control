import { useState } from "react";
import { useMessageContext } from "../../../hooks/useMessageProvider";
import { useAuthContext } from "../../../hooks/useAuthProvider";
import { DotsVertical } from "../../../components/svg";

const AdminConversations = () => {
  const [toolTip, setToolTip] = useState(false);
  const { hdlConversationsActions } = useMessageContext();
  const { sessionAuth } = useAuthContext();

  const setAcctions = (action: string) => {
    hdlConversationsActions({ actions: action, ids: [] });
  };

  const hdlToolTip = () => {
    setToolTip(!toolTip);
  };

  return (
    <div className="admin__conversations">
      <span>Conversaciones</span>

      {sessionAuth.userRol == "superadmin" && (
        <>
          <button type="button" onClick={hdlToolTip} className="btn__dots__actions">
            <DotsVertical />
          </button>
          <div
            className={`admin__options ${
              toolTip ? "admin__options--open" : ""
            }`}
            
          >
            <button className="admin__options__btn" type="button" onClick={() => setAcctions("changes-status")}>
              Cambiar estatus
            </button>
            <button className="admin__options__btn" type="button" onClick={() => setAcctions("delete")}>
              Eliminar Conversaciones
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminConversations