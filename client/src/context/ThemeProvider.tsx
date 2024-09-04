import { createContext, useEffect, useState } from "react";

interface ThemeContex {
  toggleAside: boolean;
  themeColor: string;
  hldToggleAside(): void;
  hdlToggleThemeColor(params: { colorTheme: string }): void;
}

export const ThemeContex = createContext<ThemeContex>({
  toggleAside: false,
  themeColor: "",
  hldToggleAside: () => {},
  hdlToggleThemeColor: () => {},
});

interface ThemeProvider {
  children: JSX.Element | JSX.Element[];
}

export const ThemeProvider: React.FC<ThemeProvider> = ({ children }) => {
  const [toggleAside, setToggleAside] = useState(false);
  const [themeColor, setThemeColor] = useState("dark");

  // Handle que muestra/oculta el aside
  const hldToggleAside = () => {
    setToggleAside(!toggleAside);
  };

  /**
   * Funcion que verifica la preferencia del schema de color del dispositivo.
   * @returns Boolean
   */
  const verifyPreferencesThemeDark = (): boolean => {
    const deviceDark = window.matchMedia("(prefers-color-scheme: dark)");
    if (deviceDark.matches) return true;
    else return false;
  };

  const hdlToggleThemeColor = ({ colorTheme = "" }) => {
    if (colorTheme == "dark") {
      window.localStorage.setItem("theme-color", JSON.stringify("dark"));
      document?.querySelector("body")?.removeAttribute("light");
      document?.querySelector("body")?.setAttribute("dark", "true");
      setThemeColor("dark");
    } else {
      window.localStorage.setItem("theme-color", JSON.stringify("light"));
      document?.querySelector("body")?.removeAttribute("dark");
      document?.querySelector("body")?.setAttribute("light", "true");
      setThemeColor("light");
    }
  };

  useEffect(() => {
    // Set Theme
    const theme = window.localStorage.getItem("theme-color");
    const verifySchemeTheme = verifyPreferencesThemeDark();
    if (!theme) {
      if (verifySchemeTheme) {
        hdlToggleThemeColor({ colorTheme: "dark" });
      } else {
        hdlToggleThemeColor({ colorTheme: "light" });
      }
    } else {
      const parseTheme = JSON.parse(theme);
      if (parseTheme == "dark") hdlToggleThemeColor({ colorTheme: "dark" });
      else hdlToggleThemeColor({ colorTheme: "light" });
    }
  }, []);

  return (
    <ThemeContex.Provider
      value={{
        toggleAside,
        hldToggleAside,
        themeColor,
        hdlToggleThemeColor,
      }}
    >
      {children}
    </ThemeContex.Provider>
  );
};
