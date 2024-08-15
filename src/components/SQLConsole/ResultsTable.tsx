import React from "react";
import { DataTable } from "../dataTable/DataTable";
import { columns } from "../dataTable/columns";

interface ResultsTableProps {
  data: {
    cols: string[];
    rows: any[];
    row_count: number;
  };
}

const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => (
  <div className="mt-6">
    <div className="flex gap-4 items-center mb-3">
      <label
        htmlFor="table-visual"
        className="block text-lg font-medium text-custom-light-gray"
      >
        Results
      </label>
      <span className="text-lg text-custom-light-blue">
        {data.row_count} rows
      </span>
    </div>
    <div
      id="table-visual"
      className="bg-custom-dark-blue rounded-lg shadow-md overflow-hidden"
    >
      {data.rows.length !== 0 && data.cols.length !== 0 && (
        <DataTable columns={columns(data.cols)} data={data.rows} />
      )}
    </div>
  </div>
);

export default ResultsTable;
