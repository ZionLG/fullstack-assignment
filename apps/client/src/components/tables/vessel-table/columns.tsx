import type { ColumnDef } from "@tanstack/react-table";
import { buttonVariants } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/generic-table/data-table-column-header";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";

import type { vesselSchema } from "./data/schema";

const columnHelper = createColumnHelper<vesselSchema>();

export const columns: ColumnDef<vesselSchema>[] = [
  columnHelper.accessor("_id", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    enableSorting: false,
    enableHiding: false,
  }) as ColumnDef<vesselSchema>,
  columnHelper.accessor("oldShipId", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Old Ship ID" />
    ),
    enableSorting: false,
    enableHiding: true,
  }) as ColumnDef<vesselSchema>,
  columnHelper.accessor("mmsi", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mmsi" />
    ),
    enableSorting: true,
    enableHiding: true,
  }) as ColumnDef<vesselSchema>,
  columnHelper.accessor("imo", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Imo" />
    ),
    enableSorting: true,
    enableHiding: true,
  }) as ColumnDef<vesselSchema>,
  columnHelper.accessor("name", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    enableSorting: true,
    enableHiding: true,
  }) as ColumnDef<vesselSchema>,
  columnHelper.accessor("callsign", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Callsign" />
    ),
    enableSorting: true,
    enableHiding: true,
  }) as ColumnDef<vesselSchema>,
  columnHelper.accessor("owner", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
    enableSorting: true,
    enableHiding: true,
  }) as ColumnDef<vesselSchema>,
  columnHelper.accessor("reported_port.name", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reported Port Name" />
    ),
    enableSorting: false,
    enableHiding: true,
  }) as ColumnDef<vesselSchema>,
  columnHelper.accessor("reported_port.ts", {
    cell: (info) => (
      <span>
        {info.getValue() && new Date(info.getValue()!).toLocaleString()}
      </span>
    ),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reported Port Time" />
    ),
    enableSorting: false,
    enableHiding: true,
  }) as ColumnDef<vesselSchema>,
  columnHelper.accessor("vessel_class", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vessel Class" />
    ),
    enableSorting: true,
    enableHiding: true,
  }) as ColumnDef<vesselSchema>,
  columnHelper.accessor("size", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    enableSorting: true,
    enableHiding: true,
  }) as ColumnDef<vesselSchema>,
  columnHelper.accessor("drought", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Drought" />
    ),
    enableSorting: true,
    enableHiding: true,
  }) as ColumnDef<vesselSchema>,
  columnHelper.accessor("flag", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Flag" />
    ),
    enableSorting: true,
    enableHiding: true,
  }) as ColumnDef<vesselSchema>,
  columnHelper.accessor("is_alive", {
    cell: (info) => (
      <span>
        {info.getValue() === true
          ? "Yes"
          : info.getValue() === false
            ? "No"
            : ""}
      </span>
    ),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Alive" />
    ),
    enableSorting: true,
    enableHiding: true,
  }) as ColumnDef<vesselSchema>,
  columnHelper.accessor("deadweight", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deadweight" />
    ),
    enableSorting: true,
    enableHiding: true,
  }) as ColumnDef<vesselSchema>,
  columnHelper.accessor("max_draught", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Max Draught" />
    ),
    enableSorting: true,
    enableHiding: true,
  }) as ColumnDef<vesselSchema>,
  columnHelper.accessor("vessel_type", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vessel Type" />
    ),
    enableSorting: true,
    enableHiding: true,
  }) as ColumnDef<vesselSchema>,
  columnHelper.accessor("number_of_blips", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number Of Blips" />
    ),
    enableSorting: true,
    enableHiding: true,
  }) as ColumnDef<vesselSchema>,
  columnHelper.accessor("draught", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Draught" />
    ),
    enableSorting: true,
    enableHiding: true,
  }) as ColumnDef<vesselSchema>,
  columnHelper.accessor("service_speed", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service Speed" />
    ),
    enableSorting: true,
    enableHiding: true,
  }) as ColumnDef<vesselSchema>,
  columnHelper.accessor("buildYear", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Build Year" />
    ),
    enableSorting: true,
    enableHiding: true,
  }) as ColumnDef<vesselSchema>,
];
