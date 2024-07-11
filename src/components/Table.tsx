import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'

export const Table = ({ cols, rows }) => {
  const columns = cols.map(col => ({
      header: col,
      accessorKey: col.toLowerCase(),
    }))

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        {table.getHeaderGroups().map((headerGroup, i) => (
          <tr key={i}>
            {headerGroup.headers.map(header => (
              <th key={header.id} className="px-6 py-3 text-sm font-extrabold text-gray-500 uppercase tracking-wider text-center">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-center">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}