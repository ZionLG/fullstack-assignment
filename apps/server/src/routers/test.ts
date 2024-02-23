import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const testRouter = createTRPCRouter({
  greeting: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { text: `Hello ${input?.name ?? "world"}` };
    }),

  getFleets: publicProcedure
    .input(z.object({ name: z.string(), vesselCount: z.number() }))
    .query(({ ctx, input }) => {
      return {
        fleets: ctx.dataFiles.fleets.map(
          (fleet) =>
            fleet.name.includes(input.name) &&
            fleet.vessels.length == input.vesselCount,
        ),
      };
    }),
});
