import { fleetRouter } from "./routers/fleet";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  fleet: fleetRouter,
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;
