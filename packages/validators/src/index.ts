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
