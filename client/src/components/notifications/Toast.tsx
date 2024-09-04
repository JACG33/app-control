import { useEffect, useRef, useState } from "react";
import "./toast.css";
import { XIcon } from "../svg";

interface Item {
  messageType: string;
  message: string;
  time: number;
}

const Item: React.FC<Item> = ({ messageType = "", message = "", time = 0 }) => {
  const timerRef = useRef<number>();
  const timertRef2 = useRef<number>();
  const timertRef3 = useRef<number>(10);

  let messageColor = "red";

  if (messageType == "info") messageColor = "blue";
  if (messageType == "danger") messageColor = "orange";
  if (messageType == "success") messageColor = "green";

  const handleClick = () => setStatus("close");

  const [status, setStatus] = useState("close");
  useEffect(() => {
    timertRef3.current += time;
    const newTime = String(time).concat("50");
    const newTime2 = String(timertRef3.current).concat("000");

    timerRef.current = setTimeout(() => setStatus("open"), Number(newTime));
    timertRef2.current = setTimeout(() => setStatus("close"), Number(newTime2));

    return () => {
      clearTimeout(timerRef?.current);
      clearTimeout(timertRef2?.current);
    };
  }, []);

  return (
    <>
      {status === "open" && (
        <div className="msg__item__wrapp">
          <div className={`msg__item msg__item--${messageColor}`}>
            <div>
              <span>{message}</span>
            </div>
            <div>
              <button
                type="button"
                className="msg__close"
                onClick={handleClick}
              >
                <XIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface Toast {
  messageType: string;
  data: { message: string }[];
}

const Toast: React.FC<Toast> = ({ messageType = "", data = [] }) => {
  return (
    <div className="message__area">
      {data.length > 0 ? (
        data.map((ele: { message: string }, index: number) => (
          <Item
            key={Math.ceil(Math.random() * 99999999)}
            message={ele.message}
            messageType={messageType}
            time={index + 1}
          />
        ))
      ) : (
        <Item message={data[0].message} messageType={messageType} time={1} />
      )}
    </div>
  );
};

export default Toast;
