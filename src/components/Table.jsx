import { Table as BootstrapTable } from "react-bootstrap";
import usePagination from "../hooks/usePagination";
import useSortColumn from "../hooks/useSortColumn";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { getPaginationData, getSortData } from "../service/tableService";

const Table = ({ data, columns, sortColumn }) => {
  const [tableData, setTableData] = useState([]);

  const {
    currentPage,
    totalPages,
    handlePageChange,
    getFirstIndexOfPage,
    getLastIndexOfPage,
  } = usePagination(data.length);

  const { activeSortColumn, handleSortColumn } = useSortColumn(sortColumn);

  useEffect(() => {
    setTableData(
      getPaginationData(
        getSortData(data, activeSortColumn.key, activeSortColumn.isAsc),
        getFirstIndexOfPage(),
        getLastIndexOfPage()
      )
    );
  }, [currentPage, activeSortColumn, data]);

  const getDisablePreviousPageClass = () => {
    return currentPage === 1 ? "disabled" : "";
  };

  const getDisableNextPageClass = () => {
    return currentPage === totalPages ? "disabled" : "";
  };

  const getSortIcon = (activeSortColumn, column) => {
    let sortType = "";
    if (!column.key) {
      return;
    }
    if (column.key === activeSortColumn.key) {
      sortType = "asc";
      if (!activeSortColumn.isAsc) {
        sortType = "desc";
      }
    }

    return <i className={`fa fa-sort-${sortType}`}></i>;
  };

  const getSortFunction = (column, onSortColumn) => {
    return column.isSortable === false ? "" : onSortColumn(column.key);
  };

  const startIndex = getFirstIndexOfPage();
  const endIndex = getLastIndexOfPage();

  return (
    <BootstrapTable className="table table-borderless table-striped" hover>
      <thead className="thead">
        <tr className="bg-dark text-white py-1">
          {columns.map((column) => (
            <th
              key={column.name}
              onClick={() => getSortFunction(column, handleSortColumn)}
            >
              {column.name}
              &nbsp;
              {getSortIcon(activeSortColumn, column)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={`tbody`}>
        {tableData.length > 0 ? (
          tableData.map((record, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={`${column.name} ${index}`}>{record[column.key]}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              className="d-flex justify-content-center align-items-center"
              colSpan={columns.length}
            >
              No Record Found
            </td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={columns.length}>
            <div className="d-flex justify-content-end align-items-center gap-3 pb-2 mx-4">
              <span>
                {`Records : ${startIndex} - ${endIndex} of ${data.length} `}
              </span>
              <button
                className={`btn btn-primary ${getDisablePreviousPageClass()}`}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              <button
                className={`btn btn-primary ${getDisableNextPageClass()}`}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </td>
        </tr>
      </tfoot>
    </BootstrapTable>
  );
};

Table.propTypes = {
  columns: propTypes.array.isRequired,
};

Table.defaultProps = {
  data: [],
};

export default Table;
