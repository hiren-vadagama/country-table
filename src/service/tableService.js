import _ from "loadsh";

export const getPaginationData = (data, startIndex, endIndex) => {
  return _.slice(data, startIndex - 1, endIndex);
};

export const getSortData = (data, sortBy, isAsc) => {
  return _.orderBy(data, sortBy, isAsc ? "asc" : "desc");
};

export const getFilteredData = (data = [], searchValue) => {
  return data.filter(
    (d) =>
      d.name.toString().toLowerCase().startsWith(searchValue.toLowerCase()) ||
      d.capitals.toString().toLowerCase().startsWith(searchValue.toLowerCase())
  );
};
