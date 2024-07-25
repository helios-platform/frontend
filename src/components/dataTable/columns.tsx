export function columns(cols) {
  return cols.map(column => {
    return {
      accessorKey: column,
      header: () => <div className="font-semibold text-center">{column}</div>,
      cell: ({ row }) => {
        return <div className="capitalize text-center">{row.getValue(column)}</div>
      },
    }
  })
 }

