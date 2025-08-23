import { data, useRevalidator } from "react-router";
import { useIntl } from "react-intl";
import { TbAlertCircle, TbCheck } from "react-icons/tb";

import {
  Box,
  Center,
  Container,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useAuth } from "~/core/auth/react";

import { getAppContext } from "~/context";

import { SignInForm } from "./components/sign-in-form";

import type { Route } from "./+types/route";

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
        id: "E60AY6",
        defaultMessage: "Sign in",
        description: "Document title.",
      }),
    },
    // TODO: Remove if not needed!
    defaultValues:
      __NODE_ENV__ !== "production"
        ? { email: "bulicmatko@gmail.com", password: "developer" }
        : undefined,
  });
}

/**
 * Component
 * */
export default function Component({ loaderData }: Route.ComponentProps) {
  const { defaultValues } = loaderData;

  const intl = useIntl();

  const auth = useAuth();

  const revalidator = useRevalidator();

  return (
    <Container size="xs" px="xl" py="15%">
      <Title order={1} ta="center" mb="xl">
        {__APP_NAME__}
      </Title>

      <Paper p="xl">
        {revalidator.state === "loading" ? (
          <Center w="100%" h="100%">
            <Stack align="center" pt="xl" pb="lg">
              <Loader size="sm" />

              <Text c="dimmed">
                {intl.formatMessage({
                  id: "Flc1sZ",
                  defaultMessage: "Signing in...",
                  description: "Loading message.",
                })}
              </Text>
            </Stack>
          </Center>
        ) : (
          <Stack gap="lg">
            <Stack gap={0}>
              <Title order={3}>
                {intl.formatMessage({
                  id: "ALJulX",
                  defaultMessage: "Sign in",
                  description: "Form title.",
                })}
              </Title>
              <Text c="dimmed">
                {intl.formatMessage({
                  id: "o06STE",
                  defaultMessage: "Welcome back!",
                  description: "Form message.",
                })}
              </Text>
            </Stack>

            <SignInForm
              defaultValues={defaultValues}
              onSubmit={async ({ values }) => {
                await auth.signInWithEmailAndPassword(
                  { email: values.email, password: values.password },
                  {
                    onError: (error) => {
                      return notifications.show({
                        color: "red",
                        icon: <Box component={TbAlertCircle} />,
                        title: intl.formatMessage({
                          id: "pp7znp",
                          defaultMessage: "Failed to sign in!",
                          description: "Notification message.",
                        }),
                        // TODO: Add translation!
                        message: error.message,
                      });
                    },
                    onSuccess: async () => {
                      await revalidator.revalidate();

                      return notifications.show({
                        color: "teal",
                        icon: <Box component={TbCheck} />,
                        title: intl.formatMessage({
                          id: "y7qdik",
                          defaultMessage: "Sign in successful!",
                          description: "Notification message.",
                        }),
                        message: intl.formatMessage({
                          id: "sDUk5W",
                          defaultMessage: "Welcome back!",
                          description: "Notification message.",
                        }),
                      });
                    },
                  },
                );
              }}
            />
          </Stack>
        )}
      </Paper>
    </Container>
  );
}
