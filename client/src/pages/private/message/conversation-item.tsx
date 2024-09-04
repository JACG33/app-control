import { useRef, useState } from "react";
import { useMessageContext } from "../../../hooks/useMessageProvider";
import { Trash } from "../../../components/svg";

interface ConversationItem {
  children: string | JSX.Element[] | JSX.Element;
  hdlOpenConversation: (
    id: number,
    asunto: string | JSX.Element[] | JSX.Element
  ) => void;
  id: number;
}

const ConversationItem: React.FC<ConversationItem> = ({
  children,
  hdlOpenConversation,
  id,
}) => {
  const { conversationsActions, hdlConversationsActions } = useMessageContext();
  const [selected, setSelected] = useState(false);

  const setIds = (id: number) => {
    if (selected) {
      const filter = structuredClone(conversationsActions.ids) as number[];
      console.log(filter);
      hdlConversationsActions({
        actions: conversationsActions.action,
        ids: filter.filter((fin) => fin != id),
      });
      setSelected(!selected);
    } else {
      hdlConversationsActions({
        actions: conversationsActions.action,
        ids: [...conversationsActions.ids, id] as {
          id: number;
          status: string;
        }[],
      });
      setSelected(!selected);
    }
  };

  return (
    <div className="conversation__wrap__item">
      <div
        className={`conversation__item`}
        onClickCapture={() => hdlOpenConversation(id, children)}
      >
        <img
          src={`https://placehold.co/40?text=${
            typeof children == "string" ? children[0] : "*"
          }`}
          alt=""
        />
        <span>{children}</span>
      </div>

      {/* Eliminar */}
      {conversationsActions.action == "delete" && (
        <div className="conversation__item__actions conversation__item__actions--delete">
          <button
            className={`conversation__item__actions__btn conversation__item__actions__btn--delete ${
              selected ? "conversation__item--selected" : ""
            }`}
            onClickCapture={() => setIds(id)}
          >
            <Trash /> Eliminar
          </button>
        </div>
      )}

      {/* Cambiar status */}
      {conversationsActions.action == "changes-status" && (
        <MultiSelectConversarionItem id={id} />
      )}
    </div>
  );
};

const MultiSelectConversarionItem = ({ id }: { id: number }) => {
  const { conversationsActions, hdlConversationsActions } = useMessageContext();
  const wrapItems = useRef<HTMLDivElement | null>(null);

  const setIds = (
    id: number,
    e: React.MouseEvent<HTMLButtonElement>,
    status: string
  ) => {
    const target = e.target as HTMLElement;
    const idjson = {
      id: 0,
      status: "",
    };

    const original = structuredClone(conversationsActions.ids) as {
      id: number;
      status: string;
    }[];

    if (target?.classList?.contains("conversation__item--selected")) {
      target?.classList?.remove("conversation__item--selected");
      const filtered = original.filter((fin) => fin?.id != id);

      hdlConversationsActions({
        actions: conversationsActions.action,
        ids: filtered,
      });
    } else {
      wrapItems?.current
        ?.querySelectorAll(".conversation__item__actions__btn")
        .forEach((ele) => {
          ele.classList.remove("conversation__item--selected");
        });

      target?.classList?.add("conversation__item--selected");

      const find = original.find((ele) => ele?.id == id);
      if (find) {
        hdlConversationsActions({
          actions: conversationsActions.action,
          ids: original.map((ele) => {
            if (ele?.id == id) return { ...ele, status: status };
            return ele;
          }),
        });
      } else {
        target?.classList?.add("conversation__item--selected");
        idjson.id = id;
        idjson.status = status;
        hdlConversationsActions({
          actions: conversationsActions.action,
          ids: [...conversationsActions.ids, idjson] as {
            id: number;
            status: string;
          }[],
        });
      }
    }
  };

  return (
    <div
      className="conversation__item__actions conversation__item__actions--change"
      ref={wrapItems}
    >
      <button
        className={`conversation__item__actions__btn conversation__item__actions__btn--change`}
        onClickCapture={(e) => setIds(id, e, "open")}
        data-status="open"
      >
        Open
      </button>
      <button
        className={`conversation__item__actions__btn conversation__item__actions__btn--change`}
        onClickCapture={(e) => setIds(id, e, "finish")}
        data-status="finish"
      >
        Finish
      </button>
      <button
        className={`conversation__item__actions__btn conversation__item__actions__btn--change`}
        onClickCapture={(e) => setIds(id, e, "on-review")}
        data-status="on-review"
      >
        On review
      </button>
    </div>
  );
};

export default ConversationItem;
