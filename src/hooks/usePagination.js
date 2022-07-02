import { useEffect, useState } from "react";

const usePagination = (totalRecordsInPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(Math.ceil(totalRecordsInPage / 10));
  }, [totalRecordsInPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleRowPerPageChange = ({ value }) => {
    setCurrentPage(1);
    setRowPerPage(value);
  };

  const resetPagination = () => {
    setCurrentPage(1);
    setRowPerPage(10);
  };

  const getFirstIndexOfPage = () => {
    if (totalRecordsInPage > 0) {
      return (currentPage - 1) * rowPerPage + 1;
    } else {
      return 0;
    }
  };

  const getLastIndexOfPage = () => {
    if (totalRecordsInPage > 0) {
      if (totalRecordsInPage > currentPage * rowPerPage) {
        return currentPage * rowPerPage;
      } else {
        return totalRecordsInPage;
      }
    } else {
      return 0;
    }
  };

  return {
    currentPage,
    totalPages,
    rowPerPage,
    handlePageChange,
    handleRowPerPageChange,
    getFirstIndexOfPage,
    getLastIndexOfPage,
    resetPagination,
  };
};

export default usePagination;
