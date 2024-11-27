import type { FastifyInstance } from "fastify/types/instance";
import { getUsers } from "./user.controller";

type UserRouteOptions = {}

export const userRoute = (fastify: FastifyInstance, options: UserRouteOptions) => {

  fastify.addHook('onRequest', fastify.authenticate);

  fastify.get('/', getUsers);
}
