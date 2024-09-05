import table from "./table.module.css";
import { useTableProvider } from "../../hooks/useTableProvider";

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

type TablePagination = {
  headerLength: number;
  pagination: Pagination;
};

const TablePagination: React.FC<TablePagination> = ({
  headerLength,
  pagination,
}) => {
  const { newPage, navButtons } = useTableProvider();

  return (
    <tfoot>
      <tr>
        <td colSpan={headerLength}>
          <div className={table.datatable__footer}>
            <div className={table.footer__wrapper}>
              <span>
                Pagina {pagination.currentNumberPage} de {pagination.totalPage}
              </span>
            </div>
            <div className={table.datatable__footer__btns}>
              <button
                className={`${table.datatable__footer__btn} ${
                  pagination.currentNumberPage == 1
                    ? table["datatable__footer__btn--active"]
                    : ""
                }`}
                onClick={() => {
                  if (pagination.firstPage)
                    newPage({ url: pagination.firstPage });
                }}
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
                  pagination.currentNumberPage == pagination.totalPage
                    ? table["datatable__footer__btn--active"]
                    : ""
                }`}
                onClick={() => {
                  if (pagination.lastPage)
                    newPage({ url: pagination?.lastPage });
                }}
              >
                {pagination.totalPage}
              </button>
            </div>
            <div className={table.footer__wrapper}>
              <span>Resultados {pagination.totalRecords}</span>
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  );
};

export default TablePagination;
