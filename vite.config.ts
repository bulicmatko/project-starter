import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { reactRouter } from "@react-router/dev/vite";

import {
  integer,
  literal,
  maxLength,
  maxValue,
  minLength,
  minValue,
  number,
  object,
  optional,
  parse,
  pipe,
  string,
  transform,
  union,
} from "valibot";

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
  APP_PORT: pipe(
    optional(string(), "5173"),
    transform(Number),
    number(),
    integer(),
    minValue(3000),
    maxValue(9999),
  ),
  APP_VERSION: pipe(
    optional(string(), "0.0.0-dev"),
    transform((v) => v.toLowerCase()),
    minLength(1),
    maxLength(32),
  ),
});

/**
 * Vite Configuration
 * https://vite.dev/config/
 * */
export default defineConfig(({ mode, isSsrBuild }) => {
  const env = parse(EnvSchema, loadEnv(mode, process.cwd(), ""));

  return {
    server: {
      port: env.APP_PORT,
      strictPort: true,
    },
    plugins: [
      // reactRouterDevTools(),
      reactRouter(),
      tsconfigPaths(),
    ],
    define: {
      __IS_SERVER__: isSsrBuild,
      __NODE_ENV__: JSON.stringify(env.NODE_ENV),
      __APP_NAME__: JSON.stringify("Project Starter"),
      __APP_VERSION__: JSON.stringify(env.APP_VERSION),
    },
  };
});
