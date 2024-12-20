import Fastify, { type FastifyReply, type FastifyRequest } from 'fastify';
import { mongoose } from './config/mongoose.config';
import { authRoute } from './modules/auth/auth.route';
import { authSchema } from './modules/auth/auth.schema';
import fastifyJwt, { type FastifyJWT } from '@fastify/jwt';
import { userRoute } from './modules/user/user.route';
import Swagger from '@fastify/swagger';
import SwaggerUI from '@fastify/swagger-ui';

export const fastify = Fastify({ logger: true });

const port = Number(process.env.PORT);

fastify.addHook('onReady', () => {
  fastify.log.info(`server is running on port ${port}`);
});

fastify.addHook('onClose', () => {
  fastify.log.info('server is shout down');
});

fastify.addHook('onRequest', (req, _rep, done) => {
  req.jwt = fastify.jwt;
  return done();
})

fastify.decorate(
  'authenticate',
  async (req: FastifyRequest, rep: FastifyReply) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return rep.status(401).send({ message: 'Authentication required' });
      }

      const token = authHeader.split(' ')[1]; // Extract the token part
      const decoded = req.jwt.verify<FastifyJWT['userPayload']>(token);
      req.user = decoded;
    } catch (error) {
      return rep.status(401).send({ message: 'Invalid or expired token' });
    }
  }
);

for (let schema of [...authSchema]) {
  fastify.addSchema(schema);
}

fastify.register(fastifyJwt, {
  secret: String(process.env.JWT_SECRET),
  sign: {
    expiresIn: String(process.env.JWT_EXPIRATION)
  }
});

if (process.env.ENV !== 'test')
  fastify.register(mongoose);

fastify.register(Swagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Test swagger',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0'
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Development server'
      }
    ],
    tags: [
      { name: 'auth', description: 'Auth related end-points' },
      { name: 'users', description: 'users related end-points' },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    }
  }
});

fastify.register(SwaggerUI, {
  routePrefix: '/docs',
});

fastify.register(userRoute, { prefix: 'api/v1/users', });
fastify.register(authRoute, { prefix: 'api/v1/auth', });

const start = () => {
  fastify.listen({ port, host: '0.0.0.0' }, (error) => {
    if (error) {
      fastify.log.error('error running server', error);
    }
  });

  const signals = ['SIGINT', 'SIGTERM'];
  signals.forEach((signal) => {
    process.on(signal, async () => {
      fastify.log.info('shutting down the server');
      await fastify.close();
      process.exit(0);
    })
  });
}

start();
