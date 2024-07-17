"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalCount: number;
  totalPages: number;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  pagination: PaginationState;
  onPaginationChange: ((pagination: PaginationState) => PaginationState);
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  pagination,
  onPaginationChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: pageCount
  })
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-start space-x-2 py-4">
        <button
          // onClick={() => table.previousPage()}
          onClick={() => onPaginationChange(old => ({ ...old, pageIndex: Math.max(0, old.pageIndex - 1) }))}
          disabled={!table.getCanPreviousPage()}
          className="px-2 py-1 border rounded"
        >
          Previous
        </button>
        <span>
          Page {pagination.pageIndex + 1} of {pageCount}
        </span>
        <button
          onClick={() => onPaginationChange(old => ({ ...old, pageIndex: Math.min(pageCount - 1, old.pageIndex + 1) }))}
          disabled={!table.getCanNextPage()}
          className="px-2 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  )
}
