import { createContext, useState } from "react";

interface ConversationsActions {
  action: string;
  ids: number[] | Array<{ id: number; status: string }>;
}

interface MessagesActions {
  open: boolean;
  ids: number[];
}

interface MessageContext {
  conversationsActions: ConversationsActions;
  messageActions: MessagesActions;
  hdlMessageActions(params: { open: boolean; ids: number[] }): void;
  hdlConversationsActions(params: {
    actions: string;
    ids: number[] | Array<{ id: number; status: string }>;
  }): void;
}

interface ThemeProvider {
  children: JSX.Element | JSX.Element[];
}

export const MessageContext = createContext<MessageContext>({
  conversationsActions: { action: "", ids: [] },
  messageActions: { open: false, ids: [] },
  hdlMessageActions: () => {},
  hdlConversationsActions: () => {},
});

export const MessageProvider: React.FC<ThemeProvider> = ({ children }) => {
  const [conversationsActions, setConversationsActions] =
    useState<ConversationsActions>({
      action: "",
      ids: [],
    });

  const [messageActions, setMessageActions] = useState<MessagesActions>({
    open: false,
    ids: [],
  });

  /**
   * Funcion que cambia las acciones a realizar con las conversaciones.
   * @param {Object} opc Objeto de opciones.
   * @param {String} opc.actions Tipo de accion a realizar.
   * @param {Array} opc.ids Arreglo de ids de las conversaciones.
   */
  const hdlConversationsActions = ({
    actions,
    ids,
  }: {
    actions: string;
    ids: number[];
  }) => {
    setConversationsActions({ ...conversationsActions, action: actions, ids });
  };

  const hdlMessageActions = ({
    open = false,
    ids = [],
  }: {
    open: boolean;
    ids: number[];
  }) => {
    setMessageActions({ open, ids });
  };

  return (
    <MessageContext.Provider
      value={{
        conversationsActions,
        messageActions,
        hdlConversationsActions,
        hdlMessageActions,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
