import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  filtersStateSchemaVessel,
  sortStateSchemaFleet,
  sortStateSchemaVessel,
} from "@acme/validators";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const fleetRouter = createTRPCRouter({
  greeting: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { text: `Hello ${input?.name ?? "world"}` };
    }),
  getFleetById: publicProcedure
    .input(
      z.object({
        fleetId: z.string(),
        take: z.number().min(1).max(100),
        skip: z.number().min(0),
        sort: sortStateSchemaVessel,
        filter: filtersStateSchemaVessel,
      }),
    )
    .query(({ ctx, input }) => {
      console.log(input.filter);
      const fleet = ctx.dataFiles.fleets.find(
        (fleet) => fleet._id === input.fleetId,
      );
      if (!fleet) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Fleet not found" });
      }

      const vessels = ctx.dataFiles.vessels.filter((vessel) => {
        const fleetVesselsId = fleet.vessels.map((vessel) => vessel._id);
        const nameFilterString = input.filter.find(
          (filter) => filter.id === "name",
        )?.value;
        const flagFilterString = input.filter.find(
          (filter) => filter.id === "flag",
        )?.value;
        const mmsiFilterString = input.filter.find(
          (filter) => filter.id === "mmsi",
        )?.value;

        const nameFilter =
          (!vessel.name && !nameFilterString) ||
          (vessel.name &&
            (!nameFilterString ||
              vessel.name
                .toLowerCase()
                .includes(nameFilterString.toLowerCase())))
            ? true
            : false;

        const flagFilter =
          (!vessel.flag && !flagFilterString) ||
          (vessel.flag &&
            (!flagFilterString ||
              vessel.flag
                .toLowerCase()
                .includes(flagFilterString.toLowerCase())))
            ? true
            : false;

        const mmsiFilter =
          (!vessel.mmsi && !mmsiFilterString) ||
          (vessel.mmsi &&
            (!mmsiFilterString ||
              vessel.mmsi.toString().includes(mmsiFilterString.toLowerCase())))
            ? true
            : false;
        return (
          fleetVesselsId.includes(vessel._id) &&
          nameFilter &&
          flagFilter &&
          mmsiFilter
        );
      });

      // Use slice to implement pagination
      const paginatedVessels = vessels
        .slice(input.skip, input.skip + input.take)
        .sort((a, b) => {
          if (input.sort.length === 0) {
            return 0;
          }

          const sort = input.sort[0];

          if (sort) {
            if (sort.id in a && sort.id in b) {
              if (
                typeof a[sort.id] === "number" &&
                typeof b[sort.id] === "number"
              ) {
                const aValue = Number(a[sort.id]);
                const bValue = Number(b[sort.id]);
                if (sort.desc) {
                  return bValue - aValue;
                } else {
                  return aValue - bValue;
                }
              }
              if (
                typeof a[sort.id] === "string" &&
                typeof b[sort.id] === "string"
              ) {
                if (sort.desc) {
                  return (b[sort.id]?.toString() ?? "").localeCompare(
                    a[sort.id]?.toString() ?? "",
                  );
                } else {
                  return (a[sort.id]?.toString() ?? "").localeCompare(
                    b[sort.id]?.toString() ?? "",
                  );
                }
              }
              if (
                typeof a[sort.id] === "boolean" &&
                typeof b[sort.id] === "boolean"
              ) {
                if (sort.desc) {
                  return b[sort.id] === a[sort.id] ? 0 : b[sort.id] ? 1 : -1;
                } else {
                  return a[sort.id] === b[sort.id] ? 0 : a[sort.id] ? 1 : -1;
                }
              }
            }
          }

          return 0; // Add this line to return a default value when no sorting condition is matched
        });
      const vesselsWithLocation = paginatedVessels.map((vessel) => {
        const location =
          ctx.dataFiles.vesselLocations.find(
            (location) => location._id === vessel._id,
          ) ?? null;

        return {
          ...vessel,
          location: {
            latitude: location?.lastpos.geometry.coordinates[0] ?? null,
            longitude: location?.lastpos.geometry.coordinates[1] ?? null,
          },
        };
      });

      return {
        data: vesselsWithLocation,
        count: vessels.length,
      };
    }),
  getFleets: publicProcedure
    .input(
      z.object({
        take: z.number().min(1).max(100),
        skip: z.number().min(0),
        sort: sortStateSchemaFleet,
      }),
    )
    .query(({ ctx, input }) => {
      console.log(input.sort);
      const filteredFleets = ctx.dataFiles.fleets.map((fleet) => {
        return {
          id: fleet._id,
          name: fleet.name,
          vesselCount: fleet.vessels.length,
        };
      });

      // Use slice to implement pagination
      const paginatedFleets = filteredFleets
        .slice(input.skip, input.skip + input.take)
        .sort((a, b) => {
          if (input.sort.length === 0) {
            return 0;
          }

          const sort = input.sort[0];

          if (sort) {
            if (sort.id === "name") {
              if (sort.desc) {
                return b.name.localeCompare(a.name);
              } else {
                return a.name.localeCompare(b.name);
              }
            }
            if (sort.id === "vesselCount") {
              if (sort.desc) {
                return b.vesselCount - a.vesselCount;
              } else {
                return a.vesselCount - b.vesselCount;
              }
            }
          }

          return 0; // Add this line to return a default value when no sorting condition is matched
        });

      return {
        fleets: paginatedFleets,
        count: filteredFleets.length,
      };
    }),
});
