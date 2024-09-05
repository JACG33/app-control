import { useRef } from "react";
import { Eye } from "../svg";

type Props = React.InputHTMLAttributes<HTMLInputElement>

const InputPassword = ({ ...props }: Props) => {
  const inpPassRef = useRef<HTMLInputElement | null>(null);
  const toggleInp = () => {
    if (inpPassRef?.current?.type) {
      if (inpPassRef.current.type == "text")
        inpPassRef.current.type = "password";
      else inpPassRef.current.type = "text";
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <input {...props} ref={inpPassRef} />
      <button
        style={{
          position: "absolute",
          top: "5px",
          right: "6px",
          padding: "0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        onClick={toggleInp}
        type="button"
      >
        <Eye />
      </button>
    </div>
  );
};

export default InputPassword;
