import type { FastifyInstance } from 'fastify';
import mongooseDb from 'mongoose';

export const mongoose = async (fastify: FastifyInstance) => {
  try {
    const mongoDBUri = String(process.env.MONGODB_URI);
    await mongooseDb.connect(mongoDBUri);

    fastify.log.info('connected to database');
  } catch (error) {
    fastify.log.info('error connecting to database', error);
    process.exit(1);
  }
}
