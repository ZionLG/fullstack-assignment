import type { RouterOutputs } from "@acme/server";

export type fleetsSchema = RouterOutputs["fleet"]["getFleets"]["fleets"];

export type fleetSchema = RouterOutputs["fleet"]["getFleets"]["fleets"][number];
