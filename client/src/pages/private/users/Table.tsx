import { useEffect, useState } from "react";
import { EditPen, Trash } from "../../../components/svg";
import { API_URL } from "../../../constans/api";
import table from "../../../components/table/table.module.css";
import { ErrorResponseHttp } from "../../../types/Response.types";
import { useAuthContext } from "../../../hooks/useAuthProvider";

interface Data {
  id_user: string;
  nombre_usuario: string;
  nombre: string;
  apellido: string;
  Role: {
    role_name: string;
  };
}

interface Pagination {
  firstPage?: string;
  prevPage?: string;
  nextPage?: string;
  lastPage?: string;
  baseUrl?: string;
  limit?: number;
  totalRecords?: number;
  totalPage?: number;
  currentNumberPage?: number;
}

interface ResData {
  body?: Data[];
  message?: string;
  pagination?: Pagination;
  error?: string;
}

interface DataToTabla {
  data: Data[];
  pagination: Pagination;
}

interface Table {
  body: Data[];
  pagination: Pagination;
  header: string[];
  hldEdit(id: string): void;
  hldDelete(id: string): void;
}

const Table = ({ body, pagination, hldDelete, hldEdit, header }: Table) => {
  const [dataToTabla, setDataToTabla] = useState<DataToTabla>({
    data: [],
    pagination: {},
  });
  const [navButtons, setNavButtons] = useState([
    { url: "", numberPage: 0, current: false },
  ]);

  const { getHttp}=useAuthContext()

  const makeNavButtons = ({
    totalPage,
    limitPage,
    current,
  }: {
    totalPage: number;
    limitPage: number;
    current: number;
  }) => {
    const numLength = totalPage;
    let arrNavButtons = [];
    const limitPush = 4;
    const nextLength = current + limitPush;
    const prevLength = current - 4;

    for (let ind = current; ind > prevLength; ind--)
      if (ind > 1 && ind < current)
        if (ind == current) {
          arrNavButtons.push({
            url: `/users?limit=${limitPage}&page=${ind}`,
            numberPage: ind,
            current: true,
          });
        } else {
          arrNavButtons.push({
            url: `/users?limit=${limitPage}&page=${ind}`,
            numberPage: ind,
            current: false,
          });
        }

    arrNavButtons = arrNavButtons.reverse();

    for (let index = current; index < nextLength; index++)
      if (index > 1 && index < numLength)
        if (index == current) {
          arrNavButtons.push({
            url: `/users?limit=${limitPage}&page=${index}`,
            numberPage: index,
            current: true,
          });
        } else {
          arrNavButtons.push({
            url: `/users?limit=${limitPage}&page=${index}`,
            numberPage: index,
            current: false,
          });
        }

    setNavButtons(arrNavButtons);
  };

  const newPage = async ({ url = "" }) => {
    try {
      const localUrl = url.replace(`http://localhost:3000/api`, "");
      // console.log(`${API_URL}${localUrl}`);
     
      const res = await getHttp({endpoint: `${API_URL}${localUrl}`});

      if (!res.ok) throw res;

      const json = (await res.json()) as ResData;

      if (json?.body && json?.pagination)
        setDataToTabla({ data: json.body, pagination: json.pagination });

      if (
        json?.pagination?.limit &&
        json?.pagination?.totalPage &&
        json?.pagination?.currentNumberPage
      )
        makeNavButtons({
          limitPage: json.pagination.limit,
          totalPage: json.pagination.totalPage,
          current: json.pagination.currentNumberPage,
        });
    } catch (error) {
      if (error && typeof error == "object" && "body" in error) {
        const messages = error as ErrorResponseHttp;
        console.log(messages);

        // setErrors({
        //   typeMessage: "error",
        //   messages: messages.body,
        // });
      }
    }
  };

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
      <tfoot>
        <tr>
          <td colSpan={header.length}>
            <div className={table.datatable__footer}>
              <div className={table.footer__wrapper}>
                <span>
                  Pagina {dataToTabla.pagination.currentNumberPage} de{" "}
                  {dataToTabla.pagination.totalPage}
                </span>
              </div>
              <div className={table.datatable__footer__btns}>
                <button
                  className={`${table.datatable__footer__btn} ${
                    dataToTabla.pagination.currentNumberPage == 1
                      ? table["datatable__footer__btn--active"]
                      : ""
                  }`}
                  onClick={() =>
                    newPage({ url: dataToTabla.pagination.firstPage })
                  }
                >
                  1
                </button>

                {navButtons.length > 0 &&
                  navButtons.map((navButton) => (
                    <button
                      className={`${table.datatable__footer__btn} ${
                        navButton.current
                          ? table["datatable__footer__btn--active"]
                          : ""
                      }`}
                      key={navButton.numberPage}
                      onClick={() => newPage({ url: navButton.url })}
                    >
                      {navButton.numberPage}
                    </button>
                  ))}

                <button
                  className={`${table.datatable__footer__btn} ${
                    dataToTabla.pagination.currentNumberPage ==
                    dataToTabla.pagination.totalPage
                      ? table["datatable__footer__btn--active"]
                      : ""
                  }`}
                  onClick={() =>
                    newPage({ url: dataToTabla.pagination.lastPage })
                  }
                >
                  {dataToTabla.pagination.totalPage}
                </button>
              </div>
              <div className={table.footer__wrapper}>
                <span>Resultados {dataToTabla.pagination.totalRecords}</span>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
