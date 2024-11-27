import type { FastifyReply, FastifyRequest } from "fastify";
import type { LoginRequest, SignUpRequest } from "./auth.schema";
import bcrypt from 'bcrypt';
import UserModel from "../../model/user.model";

const HAST_SALT_ROUNDS = 10;

const createJWT = (userId: string, req: FastifyRequest) => {
  const payload = { userId };
  return req.jwt.sign(payload);
};

export const signUp = async (
  req: FastifyRequest<{ Body: SignUpRequest }>,
  rep: FastifyReply) => {

  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (user) {
    return rep.status(401).send({ message: 'User already exists with this email' });
  }

  try {
    const hash = await bcrypt.hash(password, HAST_SALT_ROUNDS);
    const user = await UserModel.create({
      ...req.body,
      password: hash,
    });

    const token = createJWT(user.id, req);
    return rep.status(201).send({ token });
  } catch (error) {
    return rep.status(500).send({ message: 'Internal server error' });
  }
}

export const login = async (
  req: FastifyRequest<{ Body: LoginRequest }>,
  rep: FastifyReply) => {

  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return rep.status(401).send({ message: 'Email or password is invalid' });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return rep.status(401).send({ message: 'Email or password is invalid' });
  }

  const token = createJWT(user.id, req);

  return rep.status(200).send({ token });
}
