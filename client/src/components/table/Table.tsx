import { useEffect } from "react";
import { TableProvider } from "../../context/TableProvider";
import { useTableProvider } from "../../hooks/useTableProvider";
import { TableComp } from "../../types/Table.types";
import { EditPen, Trash } from "../svg";
import TablePagination from "./table-pagination";
import table from "./table.module.css";

const Table = ({ body, pagination, hldDelete, hldEdit, header }: TableComp) => {
  return (
    <TableProvider>
      <TableComponent
        body={body}
        pagination={pagination}
        header={header}
        hldDelete={hldDelete}
        hldEdit={hldEdit}
      />
    </TableProvider>
  );
};

const TableComponent = ({
  body,
  pagination,
  hldDelete,
  hldEdit,
  header,
}: TableComp) => {
  const { makeNavButtons, dataToTabla, setDataToTabla } = useTableProvider();

  useEffect(() => {
    if (body && pagination)
      setDataToTabla({ data: body, pagination: pagination });
    if (
      pagination?.limit &&
      pagination?.totalPage &&
      pagination?.currentNumberPage
    )
      makeNavButtons({
        limitPage: pagination?.limit,
        totalPage: pagination?.totalPage,
        current: pagination?.currentNumberPage,
      });
  }, []);

  return (
    <table className={table.table}>
      <thead>
        <tr>
          {header.length > 0 &&
            header.map((head) => <th key={Math.random() * 999999}>{head}</th>)}
        </tr>
      </thead>

      <tbody>
        {dataToTabla.data.length > 0 &&
          dataToTabla.data.map((ele) => (
            <tr key={`${ele.id_user}`}>
              <td>{ele.nombre_usuario}</td>
              <td>{ele.Role.role_name}</td>
              <td>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <button
                    className={`${table.table__button} ${table["table__button--edit"]}`}
                    type="button"
                    onClick={() => hldEdit(ele.id_user)}
                  >
                    <EditPen />
                  </button>
                  <button
                    className={`${table.table__button} ${table["table__button--delete"]}`}
                    type="button"
                    onClick={() => hldDelete(ele.id_user)}
                  >
                    <Trash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
      <TablePagination
        headerLength={header.length}
        pagination={dataToTabla.pagination}
      />
    </table>
  );
};

export default Table;
