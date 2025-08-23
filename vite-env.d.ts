/// <reference types="vite/client" />

/**
 * Environment
 * */
declare const __IS_SERVER__: boolean;
declare const __NODE_ENV__: "production" | "development" | "debug" | "test";

/**
 * Application
 * */
declare const __APP_NAME__: string;
declare const __APP_VERSION__: string;
