import type { JWT } from "@fastify/jwt";

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT;
  }

  export interface FastifyInstance {
    authenticate: any;
  }
}

type UserPayload = {
  userId: string;
};

declare module '@fastify/jwt' {
  interface FastifyJWT {
    userPayload: UserPayload;
  }
}
