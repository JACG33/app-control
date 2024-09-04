import { useContext } from "react";
import { AuthContex } from "../context/AuthProvider";

export const useAuthContext = () => useContext(AuthContex)