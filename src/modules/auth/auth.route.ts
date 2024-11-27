import type { FastifyInstance } from "fastify";
import { $ref } from "./auth.schema";
import { login, signUp } from "./auth.controller";

type AuthRouteOptions = {}

export const authRoute = (fastify: FastifyInstance, _options: AuthRouteOptions) => {

  fastify.post(
    '/signup',
    {
      schema: {
        tags: ['auth'],
        body: $ref('signUpRequestSchema'),
        response: {
          201: $ref('authResponseSchema'),
        },
      },
    },
    signUp,
  );

  fastify.post(
    '/login',
    {
      schema: {
        tags: ['auth'],
        body: $ref('loginRequestSchema'),
        response: {
          200: $ref('authResponseSchema'),
        },
      },
    },
    login
  )
}
