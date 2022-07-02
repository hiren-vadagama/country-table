import { useState } from "react";
import { getFilteredData } from "../service/tableService";
import { COUNTRY_TABLE_DETAILS } from "../utils/data";
import Input from "./Input";
import Table from "./Table";

const CountryTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [countryData, setCountryData] = useState(COUNTRY_TABLE_DETAILS.data);
  const onChange = (e) => {
    setSearchValue(e.currentTarget.value);
    setCountryData(
      getFilteredData(COUNTRY_TABLE_DETAILS.data, e.currentTarget.value)
    );
  };

  return (
    <div>
      <h4 className="my-4">Country Table</h4>
      <div className="row my-2 mx-2">
        <div className="col-md-9"></div>
        <div className="col-md-3">
          <Input>
            <Input.Field
              name="search"
              type="search"
              value={searchValue}
              onChange={onChange}
              placeholder="Search"
            />
            <Input.PostfixAddOn className="bg-primary">
              <i className="fa fa-search text-white" aria-hidden="true"></i>
            </Input.PostfixAddOn>
          </Input>
        </div>
      </div>

      <Table
        data={countryData}
        columns={COUNTRY_TABLE_DETAILS.columns}
        sortColumn={COUNTRY_TABLE_DETAILS.defaultSortColumn}
      />
    </div>
  );
};

export default CountryTable;
