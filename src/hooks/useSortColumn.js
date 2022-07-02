import { useEffect, useState } from "react";

const useSortColumn = (defaultSortColumn) => {
  const [activeSortColumn, setActiveSortColumn] = useState(defaultSortColumn);

  const handleSortColumn = (key) => {
    let order = true;
    if (activeSortColumn.key === key) {
      order = !activeSortColumn.isAsc;
    }
    setActiveSortColumn({
      key,
      isAsc: order,
    });
  };

  return {
    activeSortColumn,
    setActiveSortColumn,
    handleSortColumn,
  };
};

export default useSortColumn;
