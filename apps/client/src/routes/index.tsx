import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import type { z } from "zod";
import * as React from "react";
import { columns } from "@/components/tables/fleet-table/columns";
import { DataTableToolbar } from "@/components/tables/fleet-table/fleet-table-toolbar";
import { DataTable } from "@/components/ui/generic-table/data-table";
import { trpc } from "@/utils/trpc";
import { createFileRoute } from "@tanstack/react-router";

import { sortStateSchemaFleet } from "@acme/validators";

export const Route = createFileRoute("/")({
  component: FleetsViewComponent,
});

function FleetsViewComponent() {
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );
  const { data, isFetching } = trpc.fleet.getFleets.useQuery(
    {
      take: pageSize,
      skip: pageIndex * pageSize,
      sort: sorting as z.infer<typeof sortStateSchemaFleet>,
    },
    {
      placeholderData: (previous) => previous,
      refetchOnWindowFocus: false,
    },
  );
  return (
    <div className="p-10">
      <DataTable
        Toolbar={DataTableToolbar}
        data={{
          isLoading: isFetching,
          rows: data?.fleets,
          pageCount: Math.ceil((data?.count ?? 1) / pageSize),
          pagination: pagination,
          setPagination: setPagination,
          initialVisibility: {
            id: false,
          },
          columnFilters: columnFilters,
          setColumnFilters: setColumnFilters,
          sorting: sorting,
          setSorting: setSorting,
        }}
        columns={columns}
      />
    </div>
  );
}
