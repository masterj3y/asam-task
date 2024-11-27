import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const signUpRequestSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type SignUpRequest = z.infer<typeof signUpRequestSchema>;

const loginRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

const authResponseSchema = z.object({
  token: z.string(),
});

export const { schemas: authSchema, $ref } = buildJsonSchemas({
  signUpRequestSchema,
  loginRequestSchema,
  authResponseSchema,
});
