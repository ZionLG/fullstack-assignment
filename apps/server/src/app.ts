import cors from "@fastify/cors";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";

import { createContext } from "./context";
import { appRouter } from "./router";

const server = fastify({
  maxParamLength: 5000,
});
void server.register(cors, {
  // put your options here
});
void server.register(fastifyTRPCPlugin, {
  trpcOptions: { router: appRouter, createContext },
});

void (async () => {
  try {
    await server.listen({ port: 4000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
