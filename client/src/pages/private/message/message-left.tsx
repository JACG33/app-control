interface MessageLeft {
  content: string;
  autor: string;
  time: string;
}

const MessageLeft: React.FC<MessageLeft> = ({ content, autor, time }) => {
  return (
    <div className="message--left">
      <div className="message">
        <div>
          <span>{autor}</span>
        </div>
        <p>{content}</p>
        <div className="message__time">
          <small>{new Date(time).toLocaleTimeString()}</small>
        </div>
      </div>
    </div>
  );
};

export default MessageLeft;
