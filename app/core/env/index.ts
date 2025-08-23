import { literal, object, parse, string, union } from "valibot";

/**
 * Env Schema
 * */
const EnvSchema = object({
  NODE_ENV: union([
    literal("production"),
    literal("development"),
    literal("debug"),
    literal("test"),
  ]),

  /**
   * Application
   * */
  APP_BASE_URL: string(),

  /**
   * Better Auth
   * */
  BETTER_AUTH_SECRET: string(),

  /**
   * Postgres
   * */
  POSTGRES_URL: string(),

  /**
   * Redis
   * */
  REDIS_URL: string(),
});

/**
 * Env
 * */
export const env = parse(EnvSchema, process.env);
