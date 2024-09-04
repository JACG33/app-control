import { useThemeContex } from "../../hooks/useThemeProvider";
import toggleThemeCss from "./toggletheme.module.css";
import { Moon, Sun } from "../svg";

const ToggleTheme = () => {
  const { hdlToggleThemeColor, themeColor } = useThemeContex();
  return (
    <div className={toggleThemeCss.wrapper__toggle__theme}>
      <span>Toggle Theme</span>
      <button
        title="Toggle Theme of Web"
        className={toggleThemeCss.button}
        onClick={() =>
          hdlToggleThemeColor({
            colorTheme: themeColor == "dark" ? "light" : "dark",
          })
        }
      >
        <div
          className={`${toggleThemeCss.circle} ${
            themeColor == "dark" ? toggleThemeCss["circle--move"] : ""
          }`}
        >
          {themeColor == "dark" ? <Moon /> : <Sun />}
        </div>
      </button>
    </div>
  );
};

export default ToggleTheme;
