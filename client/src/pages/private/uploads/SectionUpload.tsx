import uploadStyles from "./uploads.module.css";

interface SectionUpload {
  children: JSX.Element[] | JSX.Element;
}

const SectionUpload: React.FC<SectionUpload> = ({ children }) => {
  return (
    <div className={`${uploadStyles.wrapper__items__upload}`}>{children}</div>
  );
};

export default SectionUpload;
