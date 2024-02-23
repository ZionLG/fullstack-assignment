import { apiUtils } from "@/utils/trpc";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/fleets/$fleetId")({
  parseParams: (params) => ({
    fleetId: z.string().parse(params.fleetId),
  }),
  loader: ({ params: { fleetId } }) => {
    console.log(fleetId);
    apiUtils.fleet.getFleetById.ensureData({
      fleetId: fleetId,
      skip: 0,
      take: 10,
      sort: [],
    });
  },
});
