import { createContext, useState } from "react";
import { useAuthContext } from "../hooks/useAuthProvider";
import { API_URL } from "../constans/api";
import { DataToTabla } from "../types/Table.types";

interface TableContext {
  newPage(params: { url: string }): void;
  navButtons: { url: string; numberPage: number; current: boolean }[];
  dataToTabla: DataToTabla;
  setDataToTabla(params: {
    data: DataToTabla["data"];
    pagination: DataToTabla["pagination"];
  }): void;
  makeNavButtons(params: {
    totalPage: number;
    limitPage: number;
    current: number;
  }): void;
}

export const TableContext = createContext<TableContext>({
  newPage: () => {},
  navButtons: [],
  dataToTabla: { data: [], pagination: {} },
  makeNavButtons: () => {},
  setDataToTabla: () => {},
});

interface TableProvider {
  children: JSX.Element | JSX.Element[];
}

type StateNavButtons = {
  url: string;
  numberPage: number;
  current: boolean;
};

export const TableProvider: React.FC<TableProvider> = ({ children }) => {
  const [navButtons, setNavButtons] = useState<StateNavButtons[]>([
    { url: "", numberPage: 0, current: false },
  ]);

  const [dataToTabla, setDataToTabla] = useState<DataToTabla>({
    data: [],
    pagination: {},
  });

  const { getHttp } = useAuthContext();

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
    let arrNavButtons: { url: string; numberPage: number; current: boolean }[] =
      [];
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

      const res = await getHttp({ endpoint: `${API_URL}${localUrl}` });

      if (!res.ok) throw res;

      const json = await res.json();

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
        const messages = error;
        console.log(messages);
      }
    }
  };

  return (
    <TableContext.Provider
      value={{
        newPage,
        navButtons,
        dataToTabla,
        makeNavButtons,
        setDataToTabla,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
