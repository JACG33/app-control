import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Toast from "../../../components/notifications/Toast";
import { XIcon } from "../../../components/svg";
import { API_URL } from "../../../constans/api";
import { MessageProvider } from "../../../context/MessageProvider";
import { useAuthContext } from "../../../hooks/useAuthProvider";
import { useMessageContext } from "../../../hooks/useMessageProvider";
import {
  Conversations,
  Messages,
  StateChatConversation,
} from "../../../types/Message.types";
import { StateError } from "../../../types/Response.types";
import AdminConversations from "./admin-conversations";
import ConversationItem from "./conversation-item";
import MessageLeft from "./message-left";
import MessageRight from "./message-right";
import "./message.css";

const socket = io();

const Message = () => {
  return (
    <MessageProvider>
      <MessagePage />
    </MessageProvider>
  );
};

const MessagePage = () => {
  const [conversations, setConversations] = useState<Conversations[]>([]);
  const [chatConversation, setChatConversation] =
    useState<StateChatConversation>({
      id: 0,
      asunto: "",
    });
  const [messages, setMessages] = useState<Messages[]>([]);
  const [messageUser, setMessageUser] = useState({ messageContent: "" });
  const [errors, setErrors] = useState<StateError>({
    typeMessage: "",
    messages: [],
  });

  const {
    conversationsActions,
    messageActions,
    hdlConversationsActions,
    hdlMessageActions,
  } = useMessageContext();
  const { getHttp, deleteHttp, sessionAuth } = useAuthContext();

  /* Ref */
  const asuntoRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLInputElement | null>(null);
  const messageAreaRef = useRef<HTMLDivElement | null>(null);

  /**
   * Funcion que gestiona el submit del formulario de mensajes.
   */
  const hdlSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verrificar que el asunto de la conversacion no este vacio
    if (
      typeof chatConversation?.asunto == "string" &&
      chatConversation?.asunto?.trim() == ""
    ) {
      asuntoRef?.current?.focus();
      setErrors({
        typeMessage: "error",
        messages: [{ message: "No haz asignado el asunto del mesaje" }],
      });
      setTimeout(() => {
        setErrors({ typeMessage: "", messages: [] });
      }, 2000);
      return;
    }

    // Verificar que el mensaje no este vacio
    if (messageUser.messageContent.trim() == "") {
      messageRef?.current?.focus();
      setErrors({
        typeMessage: "error",
        messages: [{ message: "No haz escrito un mensaje" }],
      });
      setTimeout(() => {
        setErrors({ typeMessage: "", messages: [] });
      }, 2000);
      return;
    }

    // Verificar si es una conversacion existente
    if (!chatConversation.id) {
      try {
        const message = {
          asunto: chatConversation.asunto,
          user: sessionAuth.userId,
          message: messageUser.messageContent,
          creator: JSON.stringify({
            id: sessionAuth.userId,
            username: sessionAuth.userName,
          }),
          type: "",
        };

        if (sessionAuth.userRol == "superadmin") message.type = "all";
        else message.type = "single";

        socket.emit("chat conversation", message);

        setMessageUser({ messageContent: "" });
        setErrors({
          typeMessage: "success",
          messages: [{ message: "Conversacion creada" }],
        });
        setTimeout(() => {
          if (messageAreaRef.current)
            messageAreaRef.current.scrollTop =
              messageAreaRef?.current?.scrollHeight;
        }, 150);
      } catch (error) {
        if (error instanceof Response) {
          const messages = await error.json();
          setErrors({
            typeMessage: "error",
            messages: messages.body,
          });
        }
      }

      // De lo contrario interactuar con la convesacion elegida
    } else {
      try {
        const message = {
          conversation: chatConversation.id,
          message: messageUser.messageContent,
          creator: JSON.stringify({
            id: sessionAuth.userId,
            username: sessionAuth.userName,
          }),
        };

        socket.emit("chat conversation", message);
        setMessageUser({ messageContent: "" });
      } catch (error) {
        if (error instanceof Response) {
          const messages = await error.json();
          setErrors({
            typeMessage: "error",
            messages: messages.body,
          });
        }
      }
    }

    setTimeout(() => {
      setErrors({ typeMessage: "", messages: [] });
    }, 2000);
  };

  /**
   * Funcion que administra las acciones a realizar con las conversaciones
   */
  const postActions = async () => {
    // Eliminar una o varias conversaciones.

    let endpoint = "";
    if (conversationsActions.action == "delete")
      endpoint = `${API_URL}/conversations/deleteconversation`;

    if (conversationsActions.action == "changes-status")
      endpoint = `${API_URL}/conversations/update-status`;

    try {
      const res = await deleteHttp({
        endpoint,
        body: { ids: conversationsActions.ids },
      });

      if (!res.ok) throw res;
      const json = await res.json();

      setErrors({ typeMessage: "success", messages: json.body });
      console.log(json);
      hdlConversationsActions({ actions: "", ids: [] });
      getConversations();
    } catch (error) {
      if (error instanceof Response) {
        const messages = await error.json();
        setErrors({
          typeMessage: "error",
          messages: messages.body,
        });
      }
    }

    setTimeout(() => {
      setErrors({ typeMessage: "", messages: [] });
    }, 2000);
  };

  /**
   * Funciona que asigna al estado chatConversation el asunto de la nueva conversacion
   */
  const hdlAsuntoChat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    setChatConversation({ ...chatConversation, asunto: target.value });
  };

  /**
   * Funcion que actualiza el estado messageUser
   */
  const hdlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    if (target.name == "messagecontent") {
      setMessageUser({ ...messageUser, messageContent: target.value });
    }
  };

  /**
   * Funcion que abre una conversacion elegida
   */
  const hdlOpenConversation = async (
    id: number,
    asunto: string | JSX.Element[] | JSX.Element
  ) => {
    try {
      const res = await getHttp({
        endpoint: `${API_URL}/conversations/messages/${id}`,
      });

      if (!res.ok) throw res;
      const json = await res.json();

      socket.emit("join-conversarion", `conversation${id}`);

      const message = json.body.map(
        (ele: {
          message_content: string;
          id: string;
          message_creator: string;
          createdAt: string;
        }) => ({
          message: ele.message_content,
          id: ele.id,
          autor: JSON.parse(ele.message_creator),
          time: ele.createdAt,
        })
      );

      setChatConversation({ id, asunto });
      setMessages(message);
      console.log(message);

      setTimeout(() => {
        if (messageAreaRef.current)
          messageAreaRef.current.scrollTop =
            messageAreaRef?.current?.scrollHeight;
      }, 150);
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

  /**
   * Funcion que ceirra la seccion mensajes de una conversacion
   */
  const hdlCloseConversation = () => {
    socket.emit("leave-conversation");
    setChatConversation({ id: 0, asunto: "" });
    setMessages([]);
  };

  /**
   * Funcion que obtine las conversaciones de un usuario
   */
  const getConversations = async () => {
    socket.emit("join-chat-room", { type: "all" });
  };

  const hdlDeleteMessage = async () => {
    try {
      const ids = messageActions.ids;
      socket.emit("delete messages", { ids });
      hdlMessageActions({ ids: [], open: false });
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

  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    // Cuando se crea una nueva conversacion.
    socket.on("coversation created", (msg) => {
      console.log("coversation created", { msg });
      console.log({ conversations });

      getConversations();
      // setConversations([
      //   ...conversations,
      //   { name: msg.body.asunto, id: msg.body.conversationid },
      // ]);

      if (JSON.parse(msg.body.creator).id == sessionAuth.userId) {
        setChatConversation({
          id: msg.body.conversationid,
          asunto: msg.body.asunto,
        });

        setMessages([
          {
            message: msg.body.message,
            id: msg.body.messageid,
            autor: {
              id: JSON.parse(msg.body.creator).id,
              username: JSON.parse(msg.body.creator).username,
            },
            time: msg.body.time,
          },
        ]);
      }
    });

    // Cuando se añade un nuevo mensaje a una conversacion
    socket.on("message result", (msg) => {
      console.log({ msg });
      if (msg.message == "error") {
        setErrors({
          typeMessage: "error",
          messages: [{ message: "No haz escrito un mensaje" }],
        });
        setTimeout(() => {
          setErrors({ typeMessage: "", messages: [] });
        }, 2000);
        return;
      } else {
        setMessages((state) => [
          ...state,
          {
            message: msg.body.message,
            id: msg.body.messageid,
            autor: JSON.parse(msg.body.creator),
            time: msg.body.createdAt,
          },
        ]);
        setTimeout(() => {
          if (messageAreaRef.current)
            messageAreaRef.current.scrollTop =
              messageAreaRef?.current?.scrollHeight;
        }, 150);
      }
    });

    // Cunado son eliminados los mensajes de una conversacion
    socket.on("deleted messages", (msg) => {
      console.log({ msg });
      if (msg.message == "error") {
        setErrors({
          typeMessage: "error",
          messages: [{ message: "No haz escrito un mensaje" }],
        });
        setTimeout(() => {
          setErrors({ typeMessage: "", messages: [] });
        }, 2000);
        return;
      } else {
        const clone = structuredClone(messages);
        msg.body.forEach((ele: number) => {
          clone.forEach((ms: { id: number; message: string }) => {
            if (ms.id == ele) ms.message = "Mensaje Eliminado";
          });
        });

        setMessages(clone);
      }
    });

    // Cunado se solicitan todas las conversaciones, para los admin
    socket.on(
      "all-conversations-result",
      (conversations: {
        message: string;
        body: {
          conversation: string;
          id: number;
          createdAt: string;
          id_user: string;
        }[];
      }) => {
        console.log({ conversations });

        if (conversations.message == "Ok")
          if (sessionAuth.userRol != "superadmin") {
            const conversation = conversations.body
              .filter((ele) => ele.id_user == sessionAuth.userId)
              .map((ele) => ({
                name: ele.conversation,
                id: ele.id,
                time: ele.createdAt,
              }));
            setConversations(conversation);
          } else {
            const conversation = conversations.body.map((ele) => ({
              name: ele.conversation,
              id: ele.id,
              time: ele.createdAt,
            }));
            setConversations(conversation);
          }
      }
    );

    return () => {
      socket.off("message result");
      socket.off("chat conversation");
      socket.off("coversation created");
      socket.off("all-conversations-result");
      socket.off("deleted messages");
    };
  }, []);

  return (
    <div className="messages__page">
      {/* Messages */}
      {errors.typeMessage == "error" && (
        <Toast messageType="error" data={errors.messages} />
      )}
      {errors.typeMessage == "success" && (
        <Toast messageType="success" data={errors.messages} />
      )}
      {/*  */}

      {/* Messages Area */}
      <div className="messages__wrapper">
        <AdminConversations />
        <div className="messages__recived">
          {conversations.length > 0 &&
            conversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                id={conversation.id}
                hdlOpenConversation={hdlOpenConversation}
              >
                {conversation.name}
              </ConversationItem>
            ))}
        </div>

        <div>
          {conversationsActions.action != "" && (
            <div className="actions__buttons">
              <button
                className="actions__buttons__btn actions__buttons__btn--red"
                onClick={() =>
                  hdlConversationsActions({ actions: "", ids: [] })
                }
              >
                Cancelar
              </button>
              <button
                className="actions__buttons__btn actions__buttons__btn--blue"
                onClick={postActions}
              >
                Aceptar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chat Message */}
      <div className="chat__wrapper">
        <div className="header__chat">
          <div>
            {!chatConversation.id && (
              <>
                <input
                  className="asunto__input"
                  ref={asuntoRef}
                  placeholder="asunto de la conversacion"
                  name="asunto"
                  value={
                    typeof chatConversation.asunto === "string"
                      ? chatConversation.asunto
                      : ""
                  }
                  onChange={hdlAsuntoChat}
                  type="text"
                />
              </>
            )}
            {chatConversation.id > 0 && <span>{chatConversation.asunto}</span>}
          </div>
          <button
            type="button"
            onClick={hdlCloseConversation}
            title="Cerrar Conversacion"
            className="btn__close__chat"
          >
            <XIcon />
          </button>
        </div>

        {/*Admin my message*/}
        <div
          className={`message__actions__wrap ${
            messageActions.open ? "message__actions__wrap--show" : ""
          } `}
        >
          <div className="message__actions">
            <button
              type="button"
              onClick={() => hdlMessageActions({ open: false, ids: [] })}
            >
              Cancelar
            </button>
            <button type="button" onClick={() => hdlDeleteMessage()}>
              delete
            </button>
          </div>
        </div>
        {/*Admin my message*/}

        {/* Messages */}
        <div ref={messageAreaRef} className="chat__messages__area">
          {messages.length > 0 &&
            messages.map((message) => {
              if (String(message.autor.id) == String(sessionAuth.userId))
                return (
                  <MessageRight
                    key={message.id}
                    content={message.message}
                    time={message.time}
                    autor={"Yo"}
                    rawData={message}
                  />
                );
              if (String(message.autor.id) != String(sessionAuth.userId))
                return (
                  <MessageLeft
                    key={message.id}
                    content={message.message}
                    time={message.time}
                    autor={message.autor.username}
                  />
                );
            })}
        </div>
        {/* Send Message */}
        <form onSubmit={(e) => hdlSubmit(e)}>
          <div className="chat__interaction__message">
            <input
              ref={messageRef}
              type="text"
              onChange={hdlChange}
              name="messagecontent"
              value={messageUser.messageContent}
            />
            <button type="submit">send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Message;
