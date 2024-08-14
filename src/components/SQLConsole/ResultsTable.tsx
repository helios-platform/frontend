import React from 'react';
import { DataTable } from '../dataTable/DataTable';
import { columns } from '../dataTable/columns';

interface ResultsTableProps {
  data: {
    cols: string[];
    rows: any[];
    row_count: number;
  };
}

const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => (
  <div>
    <label htmlFor="table-visual" className="mb-3 block text-sm font-medium text-gray-700">
      Table Visual <span className="text-gray-500">- {data.row_count} rows</span>
    </label>
    <div id="table-visual">
      {data.rows.length !== 0 && data.cols.length !== 0 && (
        <DataTable columns={columns(data.cols)} data={data.rows} />
      )}
    </div>
  </div>
);

export default ResultsTable;