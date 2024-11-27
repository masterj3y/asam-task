import type { FastifyReply } from "fastify";
import type { FastifyRequest } from "fastify/types/request";
import UserModel from "../../model/user.model";

export const getUsers = async (_req: FastifyRequest, rep: FastifyReply) => {
  const users = await UserModel.find({});

  return rep.status(200).send(users);
}
