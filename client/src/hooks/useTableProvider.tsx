import { useContext } from "react";
import { TableContext } from "../context/TableProvider";

export const useTableProvider = () => useContext(TableContext);
