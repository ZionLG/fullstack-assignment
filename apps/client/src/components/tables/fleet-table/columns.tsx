import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/generic-table/data-table-column-header";
import { createColumnHelper } from "@tanstack/react-table";

import type { fleetSchema } from "./data/schema";

const columnHelper = createColumnHelper<fleetSchema>();

export const columns: ColumnDef<fleetSchema>[] = [
  columnHelper.accessor("id", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" hideAble={false} />
    ),
    enableSorting: false,
    enableHiding: false,
  }) as ColumnDef<fleetSchema>,
  columnHelper.accessor("name", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" hideAble={false} />
    ),
    enableSorting: true,
    enableHiding: false,
  }) as ColumnDef<fleetSchema>,
  columnHelper.accessor("vesselCount", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Vessel Count"
        hideAble={false}
      />
    ),
    enableSorting: true,
    enableHiding: false,
  }) as ColumnDef<fleetSchema>,
];
