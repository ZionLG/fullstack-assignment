import { z } from "zod";

export const dataTypes = z.union([
  z.literal("fleets"),
  z.literal("vessels"),
  z.literal("vesselLocations"),
]);

type DataTypeKeys = z.infer<typeof dataTypes>;

type FleetVessel = {
  value: number;
  _id: string;
};

type Fleet = {
  _id: string;
  name: string;
  vessels: FleetVessel[];
};

type Geometry = {
  type: string;
  coordinates: number[];
};

type LastPos = {
  ts: string;
  geometry: Geometry;
  sog: number;
  navs: number;
  course: number;
};

type VesselLocation = {
  _id: string;
  lastpos: LastPos;
};

type ReportedPort = {
  ts: string;
  name: string;
};

type Vessel = {
  _id: string;
  oldShipId: number;
  mmsi: number;
  imo: null | number;
  name: string;
  callsign: string;
  owner: null | string;
  reported_port: ReportedPort;
  vessel_class: string;
  size: number;
  drought: number;
  flag: string;
  is_alive: boolean;
  deadweight: number;
  max_draught: string;
  vessel_type: string;
  number_of_blips: number;
  draught: number;
};

// Define a mapping from keys to types
type KeyToTypeMapping = {
  fleets: Fleet[]; // replace with actual type
  vessels: Vessel[]; // replace with actual type
  vesselLocations: VesselLocation[]; // replace with actual type
};

// Use the mapping in your DataMap type
export type DataMap = {
  [K in DataTypeKeys]: KeyToTypeMapping[K];
};
