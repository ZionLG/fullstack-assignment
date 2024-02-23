import type { RouterOutputs } from "@acme/server";

export type vesselsSchema = RouterOutputs["fleet"]["getFleetById"]["data"];

export type vesselSchema =
  RouterOutputs["fleet"]["getFleetById"]["data"][number];
