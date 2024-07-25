import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

import api from '../../services/api'
import { SourcesResponse } from "../../types";
import { useIntegration } from "../../contexts/IntegrationContext";
import StreamTypeDisplay from "./StreamTypeDisplay";

const ViewSources: React.FC = () => {
  const [sources, setSources] = useState<SourcesResponse>([]);
  const { integrationName, setIntegrationName } = useIntegration();

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const data = await api.listSources();
        setSources(data ?? []);
      } catch (error) {
        console.error('Error fetching sources: ', error)
      }
    }
    fetchSources();
  }, [])

  const columns: ColumnDef<SourcesResponse[number]>[] = [
    {
      accessorKey: "streamName",
      header: "Stream Name",
    },
    {
      accessorKey: "streamType",
      header: "Stream Type",
      cell: ({ row }) => (
        <StreamTypeDisplay 
          streamType={row.original.streamType} 
          imageUrl={row.original.imageUrl} 
        />
      ),
    },
    {
      accessorKey: "tableName",
      header: "Table Name",
    },
    {
      accessorKey: "createdOn",
      header: "Created Date",
    },
    {
      id: "table_data_link",
      header: "Table Data",
      cell: ({ row }) => {
        const source = row.original;
        return (
          <Link 
            to="/sql-dashboard" 
            state={{ fromLink: true }}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md"
            onClick={() => {
              console.log('Link clicked!')
              setIntegrationName(source.tableName)
            }}
          >
            Visit {source.tableName}
          </Link>
        )
      }
    }
  ];

  const table = useReactTable({
    data: sources,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Connections</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
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
                  No Data Sources Connected
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ViewSources;