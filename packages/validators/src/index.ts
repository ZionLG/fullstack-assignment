import { z } from "zod";

export const sortStateSchemaFleet = z.array(
  z.object({
    id: z.enum(["name", "vesselCount"]),
    desc: z.boolean(),
  }),
);
export const filtersStateSchemaVessel = z.array(
  z.object({
    id: z.enum(["name", "flag", "mmsi"]),
    value: z.string(),
  }),
);
export const sortStateSchemaVessel = z.array(
  z.object({
    id: z.enum([
      "mmsi",
      "imo",
      "name",
      "callsign",
      "owner",
      "reported_port",
      "vessel_class",
      "size",
      "drought",
      "flag",
      "is_alive",
      "deadweight",
      "max_draught",
      "vessel_type",
      "number_of_blips",
      "draught",
      "service_speed",
      "buildYear",
    ]),
    desc: z.boolean(),
  }),
);
