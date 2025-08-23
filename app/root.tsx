import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/notifications/styles.css";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import type { unstable_MiddlewareFunction as MiddlewareFunction } from "react-router";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  data,
  isRouteErrorResponse,
  useNavigation,
  useRouteLoaderData,
} from "react-router";
import { IntlProvider } from "react-intl";

import type {
  CSSVariablesResolver,
  MantineColor,
  MantineColorScheme,
} from "@mantine/core";
import {
  Accordion,
  ActionIcon,
  Alert,
  Anchor,
  Avatar,
  Badge,
  Button,
  Card,
  ColorSchemeScript,
  Combobox,
  DEFAULT_THEME,
  HoverCard,
  Input,
  Loader,
  LoadingOverlay,
  MantineProvider,
  Menu,
  Modal,
  Notification,
  Overlay,
  Paper,
  ScrollArea,
  Table,
  Text,
  Textarea,
  Timeline,
  Tooltip,
  createTheme,
  localStorageColorSchemeManager,
  mantineHtmlProps,
  mergeMantineTheme,
} from "@mantine/core";
import type { DayOfWeek } from "@mantine/dates";
import { DatesProvider } from "@mantine/dates";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { AbilityProvider } from "~/core/ability/react";
import { UserProvider } from "~/core/auth/react";
import { createQueryClient } from "~/core/react-query";
import { createTrpcClient } from "~/core/trpc";
import { TrpcProvider } from "~/core/trpc/react";

import { Error401 } from "~/ui/errors/error-401";
import { Error403 } from "~/ui/errors/error-403";
import { Error404 } from "~/ui/errors/error-404";
import { Error500 } from "~/ui/errors/error-500";
import { Error503 } from "~/ui/errors/error-503";

import { getAppContext, setupAppContext } from "~/context";

import type { Route } from "./+types/root";

/**
 * Day.js Setup
 * */
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

/**
 * CSS Variables Resolver
 * */
const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    "--app-foreground-color": "var(--mantine-color-body)",
    "--app-background-color": theme.colors.gray[0],
  },
  dark: {
    "--app-foreground-color": "var(--mantine-color-body)",
    "--app-background-color": theme.colors.dark[8],
  },
});

/**
 * Custom Theme
 * */
const theme = mergeMantineTheme(
  DEFAULT_THEME,
  createTheme({
    scale: 0.9,
    defaultRadius: 4,
    cursorType: "pointer",
    respectReducedMotion: true,
    components: {
      Loader: Loader.extend({
        defaultProps: {
          size: "xs",
        },
      }),
      Paper: Paper.extend({
        defaultProps: {
          withBorder: true,
        },
      }),
      Card: Card.extend({
        defaultProps: {
          withBorder: true,
        },
      }),
      Table: Table.extend({
        defaultProps: {
          striped: true,
          withTableBorder: false,
          withRowBorders: true,
          withColumnBorders: true,
          highlightOnHover: true,
        },
      }),
      Tooltip: Tooltip.extend({
        defaultProps: {
          openDelay: 800,
          transitionProps: {
            transition: "fade",
            duration: 300,
          },
        },
      }),
      Button: Button.extend({
        defaultProps: {
          variant: "default",
          loaderProps: {
            type: "dots",
          },
        },
      }),
      HoverCard: HoverCard.extend({
        defaultProps: {
          shadow: "xs",
        },
      }),
      Menu: Menu.extend({
        defaultProps: {
          shadow: "xs",
        },
      }),
      Notification: Notification.extend({
        defaultProps: {
          withBorder: true,
        },
      }),
      ScrollArea: ScrollArea.extend({
        defaultProps: {
          scrollbarSize: 4,
          scrollHideDelay: 0,
        },
      }),
      LoadingOverlay: LoadingOverlay.extend({
        defaultProps: {
          zIndex: 1000,
          loaderProps: {
            size: "xs",
          },
          overlayProps: {
            blur: 1,
          },
          transitionProps: {
            transition: "fade",
            duration: 300,
          },
        },
      }),
      Overlay: Overlay.extend({
        defaultProps: {
          blur: 1,
        },
      }),
      Alert: Alert.extend({
        defaultProps: {
          variant: "default",
        },
      }),
      Accordion: Accordion.extend({
        defaultProps: {
          variant: "contained",
        },
      }),
      Avatar: Avatar.extend({
        defaultProps: {
          variant: "filled",
        },
      }),
      Badge: Badge.extend({
        defaultProps: {
          variant: "default",
        },
      }),
      Text: Text.extend({
        defaultProps: {
          fz: "sm",
        },
      }),
      Anchor: Anchor.extend({
        defaultProps: {
          fz: "sm",
        },
      }),
      Modal: Modal.extend({
        defaultProps: {
          scrollAreaComponent: ScrollArea.Autosize,
        },
      }),
      InputWrapper: Input.Wrapper.extend({
        defaultProps: {
          inputWrapperOrder: ["label", "input", "description", "error"],
        },
      }),
      Textarea: Textarea.extend({
        defaultProps: {
          autosize: true,
          minRows: 3,
          maxRows: 9,
        },
      }),
      ActionIcon: ActionIcon.extend({
        defaultProps: {
          variant: "default",
        },
      }),
      Combobox: Combobox.extend({
        defaultProps: {
          shadow: "xs",
        },
      }),
      Timeline: Timeline.extend({
        defaultProps: {
          bulletSize: 18,
          lineWidth: 2,
        },
      }),
      TimelineItem: Timeline.Item.extend({
        defaultProps: {
          lineVariant: "dashed",
        },
      }),
    },
  }),
);

/**
 * Color Scheme Manager
 * */
const colorSchemeManager = localStorageColorSchemeManager({
  key: "color-scheme",
});

/**
 * React Router Navigation Progress
 * */
function ReactRouterNavigationProgress() {
  const navigation = useNavigation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (navigation.state === "loading") {
        nprogress.start();
      } else {
        nprogress.complete();
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigation.state]);

  return null;
}

/**
 * Middleware
 * */
export const unstable_middleware: MiddlewareFunction[] = [setupAppContext()];

/**
 * Loader
 * */
export function loader({ context }: Route.LoaderArgs) {
  const { user, intl } = getAppContext(context);

  // TODO: If there are any System Settings load them here, pass them to the component
  // TODO: and to the System Settings Provider!

  const locale = intl.locale;
  const timezone = user?.preferences.timezone ?? intl.timeZone ?? "";
  const firstDayOfWeek = user?.preferences.firstDayOfWeek ?? 1;

  const accentColor = user?.preferences.accentColor ?? "blue";
  const colorScheme = user?.preferences.colorScheme ?? "auto";

  return data({
    user,
    locale,
    timezone,
    firstDayOfWeek,
    accentColor,
    colorScheme,
  });
}

/**
 * Layout
 * */
export function Layout({ children }: { children: ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root");

  const [queryClient] = useState(() => createQueryClient());
  const [trpcClient] = useState(() => createTrpcClient());

  if (!data) {
    // NOTE: There was probaly error thrown in root loader or in middleware.
    // NOTE: This should not happen by developer decision. If you see this error,
    // NOTE: it means that the loader or middleware is not properly handling
    // NOTE: the request correctly.
    throw new Error("Something went wrong!");
  }

  const user = data.user;

  const locale = data.locale;
  const timezone = data.timezone;
  const firstDayOfWeek = data.firstDayOfWeek as DayOfWeek;

  const accentColor = data.accentColor as MantineColor;
  const colorScheme = data.colorScheme as MantineColorScheme;

  return (
    <html lang={locale} {...mantineHtmlProps}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <Meta />

        <ColorSchemeScript defaultColorScheme={colorScheme} />

        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" sizes="any" />
        <Links />
      </head>

      <body
        style={{
          minWidth: 460,
          backgroundColor: "var(--app-background-color)",
        }}
      >
        <UserProvider user={user}>
          <AbilityProvider user={user}>
            {/* TODO: Implement Localization! */}
            {/* NOTE: Passing messages via loader creates large response payload! */}
            <IntlProvider
              locale={locale}
              timeZone={timezone}
              messages={{}}
              onError={() => null}
            >
              <QueryClientProvider client={queryClient}>
                <TrpcProvider trpcClient={trpcClient} queryClient={queryClient}>
                  <MantineProvider
                    cssVariablesResolver={cssVariablesResolver}
                    theme={mergeMantineTheme(theme, {
                      primaryColor: accentColor,
                    })}
                    colorSchemeManager={colorSchemeManager}
                    defaultColorScheme={colorScheme}
                  >
                    <NavigationProgress />
                    <ReactRouterNavigationProgress />
                    <Notifications position="top-center" />

                    <DatesProvider settings={{ locale, firstDayOfWeek }}>
                      <ModalsProvider>{children}</ModalsProvider>
                    </DatesProvider>
                  </MantineProvider>
                </TrpcProvider>

                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </IntlProvider>
          </AbilityProvider>
        </UserProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Component
 * */
// eslint-disable-next-line no-empty-pattern
export default function Component({}: Route.ComponentProps) {
  return <Outlet />;
}

/**
 * Error Boundary
 * */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 401: {
        return <Error401 />;
      }

      case 403: {
        return <Error403 />;
      }

      case 404: {
        return <Error404 />;
      }

      case 500: {
        return <Error500 />;
      }

      case 503: {
        return <Error503 />;
      }

      default: {
        return <Error500 />;
      }
    }
  }

  return <Error500 />;
}
