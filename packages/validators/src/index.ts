import { z } from "zod";

// export const filtersStateSchemaFleet = z.array(
//   z.object({
//     id: z.enum(),
//     value: z.string().or(z.array(z.string())),
//   }),
// );
export const sortStateSchemaFleet = z.array(
  z.object({
    id: z.enum(["name", "vesselCount"]),
    desc: z.boolean(),
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
