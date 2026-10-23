import fastifyHelmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import Fastify, { type FastifyError, type FastifyInstance } from "fastify";
import { loadConfig } from "./config/env.js";
import { registerHealthRoute } from "./routes/health.js";

export function buildApp(options: { logger?: boolean } = {}): FastifyInstance {
  const config = loadConfig();
  const app = Fastify({
    bodyLimit: 1_048_576,
    logger: options.logger === false ? false : { level: config.LOG_LEVEL },
  });

  app.register(fastifyHelmet);
  app.register(rateLimit, { max: 100, timeWindow: "1 minute" });
  app.register(swagger, {
    openapi: {
      info: {
        title: "MAKOU API",
        description: "Documentação inicial da API MAKOU.",
        version: "0.1.0",
      },
      tags: [{ name: "Health", description: "Estado da API" }],
    },
  });
  app.register(swaggerUi, { routePrefix: "/docs" });

  app.setNotFoundHandler((_request, reply) =>
    reply.status(404).send({ error: "Not Found", message: "Route not found" }),
  );

  app.setErrorHandler((error: FastifyError, request, reply) => {
    const statusCode = error.statusCode && error.statusCode >= 400 && error.statusCode < 500
      ? error.statusCode
      : 500;

    if (statusCode === 500) {
      request.log.error({ err: error }, "Unhandled request error");
    }

    reply.status(statusCode).send({
      error: statusCode === 500 ? "Internal Server Error" : "Request Error",
      message: statusCode === 500 ? "An unexpected error occurred" : "Request could not be processed",
    });
  });

  app.register(registerHealthRoute);

  return app;
}