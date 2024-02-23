import { z } from "zod";

import { sortStateSchemaFleet } from "@acme/validators";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const fleetRouter = createTRPCRouter({
  greeting: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { text: `Hello ${input?.name ?? "world"}` };
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
