import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import type { z } from "zod";
import * as React from "react";
import { columns } from "@/components/tables/vessel-table/columns";
import { DataTableToolbar } from "@/components/tables/vessel-table/fleet-table-toolbar";
import { DataTable } from "@/components/ui/generic-table/data-table";
import { trpc } from "@/utils/trpc";
import { createLazyFileRoute } from "@tanstack/react-router";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import {
  filtersStateSchemaVessel,
  sortStateSchemaVessel,
} from "@acme/validators";

export const Route = createLazyFileRoute("/fleets/$fleetId")({
  component: FleetComponent,
});

function FleetComponent() {
  const { fleetId } = Route.useParams();

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

  const { data, isFetching } = trpc.fleet.getFleetById.useQuery(
    {
      fleetId,
      take: pageSize,
      skip: pageIndex * pageSize,
      sort: sorting as z.infer<typeof sortStateSchemaVessel>,
      filter: columnFilters as z.infer<typeof filtersStateSchemaVessel>,
    },
    {
      placeholderData: (previous) => previous,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <div className="space-y-16 p-10">
      <DataTable
        Toolbar={DataTableToolbar}
        data={{
          isLoading: isFetching,
          rows: data?.data,
          pageCount: Math.ceil((data?.count ?? 1) / pageSize),
          pagination: pagination,
          setPagination: setPagination,
          initialVisibility: {},
          columnFilters: columnFilters,
          setColumnFilters: setColumnFilters,
          sorting: sorting,
          setSorting: setSorting,
        }}
        columns={columns}
      />
      <MapContainer
        className="h-96"
        center={{
          lat: 0,
          lng: 0,
        }}
        zoom={1}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data?.data.map((vessel) => {
          if (vessel.location.latitude && vessel.location.longitude)
            return (
              <Marker
                position={{
                  lat: vessel.location.latitude,
                  lng: vessel.location.longitude,
                }}
              >
                <Popup>
                  {Object.entries(vessel).map(([key, value]) => {
                    if (
                      key === "location" ||
                      key === "_id" ||
                      key === "oldShipId"
                    )
                      return null;
                    return (
                      <span>
                        {key}: {JSON.stringify(value)} <br />
                      </span>
                    );
                  })}
                </Popup>
              </Marker>
            );
        })}
      </MapContainer>
    </div>
  );
}
