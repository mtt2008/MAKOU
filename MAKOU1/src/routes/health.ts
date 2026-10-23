import type { FastifyInstance } from "fastify";
import { healthResponseSchema } from "../schemas/health.js";

export async function registerHealthRoute(app: FastifyInstance) {
  app.get(
    "/health",
    {
      schema: {
        tags: ["Health"],
        summary: "Verifica se a API está respondendo",
        response: {
          200: {
            type: "object",
            required: ["status"],
            properties: {
              status: { type: "string", enum: ["ok"] },
            },
          },
        },
      },
    },
    async (_request, reply) => reply.send(healthResponseSchema.parse({ status: "ok" })),
  );
}