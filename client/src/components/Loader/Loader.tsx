import "./loader.css";

interface Loader {
  css: string|null;
}

export const Loader = ({ css="" }: Loader) => {
  return (
    <div className={`wrapper__loader ${css}`}>
      <div className="loader" />
    </div>
  );
};
