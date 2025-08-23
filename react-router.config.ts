import type { Config } from "@react-router/dev/config";

/**
 * React Router Types
 * */
declare module "react-router" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Future {
    unstable_middleware: true;
  }
}

/**
 * React Router Configuration
 * https://reactrouter.com/api/framework-conventions/react-router.config.ts
 **/
export default {
  ssr: true,
  future: {
    unstable_middleware: true,
  },
} satisfies Config;
