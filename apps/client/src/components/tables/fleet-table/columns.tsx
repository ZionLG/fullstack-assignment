import type { ColumnDef } from "@tanstack/react-table";
import { buttonVariants } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/generic-table/data-table-column-header";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
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
    cell: (info) => (
      <Link
        className={cn(buttonVariants({ variant: "link" }))}
        to={"/fleets/$fleetId"}
        params={{ fleetId: info.row.getValue("id") as string }}
      >
        {info.getValue()}
      </Link>
    ),
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
