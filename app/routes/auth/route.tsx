import type { unstable_MiddlewareFunction as MiddlewareFunction } from "react-router";
import { Link, Outlet, data, href } from "react-router";
import { useIntl } from "react-intl";

import {
  Anchor,
  AppShell,
  Box,
  Container,
  Divider,
  Group,
  Text,
  rem,
} from "@mantine/core";

import { getAppContext } from "~/context";
import { unauthenticated } from "~/middleware";

import type { Route } from "./+types/route";

/**
 * Constants
 * */
const HEADER_DESKTOP_HEIGHT = 48;
const HEADER_MOBILE_HEIGHT = 64;
const MOBILE_BREAKPOINT: "sm" | "md" | "lg" = "sm";

/**
 * Middleware
 * */
export const unstable_middleware: MiddlewareFunction[] = [
  unauthenticated({ defaultRedirectTo: href("/") }),
];

/**
 * Meta
 * */
export function meta({ loaderData }: Route.MetaArgs) {
  return [{ title: `${loaderData.document.title} | ${__APP_NAME__}` }];
}

/**
 * Loader
 * */
export function loader({ context }: Route.LoaderArgs) {
  const { intl } = getAppContext(context);

  return data({
    document: {
      title: intl.formatMessage({
        id: "edSaRI",
        defaultMessage: "Auth",
        description: "Document title.",
      }),
    },
  });
}

/**
 * Component
 * */
// eslint-disable-next-line no-empty-pattern
export default function Component({}: Route.ComponentProps) {
  const intl = useIntl();

  return (
    <AppShell
      header={{
        height: {
          base: rem(HEADER_MOBILE_HEIGHT),
          [MOBILE_BREAKPOINT]: rem(HEADER_DESKTOP_HEIGHT),
        },
      }}
    >
      <AppShell.Header>
        {/* <DesktopHeader> */}
        <Box visibleFrom={MOBILE_BREAKPOINT}>
          <Group gap="sm" px="md" h={rem(HEADER_DESKTOP_HEIGHT)}>
            <Anchor
              component={Link}
              to={href("/")}
              prefetch="intent"
              fw="bold"
              td="none"
            >
              {__APP_NAME__}
            </Anchor>

            <Divider orientation="vertical" />

            <Text component="div">
              {intl.formatMessage({
                id: "VhC5U3",
                defaultMessage: "Auth",
                description: "Layout title.",
              })}
            </Text>
          </Group>
        </Box>
        {/* </DesktopHeader> */}

        {/* <MobileHeader> */}
        <Box hiddenFrom={MOBILE_BREAKPOINT}>
          <Group justify="center" px="sm" h={rem(HEADER_MOBILE_HEIGHT)}>
            <Anchor
              component={Link}
              to={href("/")}
              prefetch="intent"
              fw="bold"
              td="none"
            >
              {__APP_NAME__}
            </Anchor>
          </Group>
        </Box>
        {/* </MobileHeader> */}
      </AppShell.Header>

      <AppShell.Main>
        <Container size="xl" py="md">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
