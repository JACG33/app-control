import { useContext } from "react";
import { ThemeContex } from "../context/ThemeProvider";

export const useThemeContex = () => useContext(ThemeContex)