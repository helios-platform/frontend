import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import api from "../../api";
import { SourcesResponse } from "../../types";
import { useIntegration } from "../../contexts/IntegrationContext";
import StreamTypeDisplay from "./StreamTypeDisplay";

const ViewSources: React.FC = () => {
  const [sources, setSources] = useState<SourcesResponse>([]);
  const { setIntegrationName } = useIntegration();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSources = async () => {
      try {
        setIsLoading(true);
        const data = await api.listSources();
        setSources(data ?? []);
      } catch (error) {
        console.error("Error fetching sources: ", error);
        setError("Failed to load sources. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSources();
  }, []);

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
            className="px-3 py-1 bg-custom-medium-purple text-white rounded-md hover:bg-opacity-90 transition-colors text-sm"
            onClick={() => setIntegrationName(source.tableName)}
          >
            Visit {source.tableName}
          </Link>
        );
      },
    },
  ];

  const table = useReactTable({
    data: sources,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="text-center text-custom-light-gray">
        Loading sources...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-400">{error}</div>;
  }

  return (
    <div className="container mx-auto pt-6 pb-10 bg-custom-medium-blue shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-custom-light-purple rounded-md">
        Connections
      </h1>
      <div className="rounded-md border border-custom-medium-blue shadow-medium">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-custom-dark-gray hover:bg-custom-dark-gray/80"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-custom-light-blue">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
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
                  className="bg-custom-dark-blue hover:bg-custom-dark-blue/80"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-custom-light-gray">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-custom-light-gray"
                >
                  No Data Sources Connected
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ViewSources;
