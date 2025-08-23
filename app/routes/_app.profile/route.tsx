import { data } from "react-router";
import { useIntl } from "react-intl";

import { Paper, Stack, Title } from "@mantine/core";

import { useUserOrThrow } from "~/core/auth/react";

import { getAppContextWithUserOrThrow } from "~/context";

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
  const { intl, ability } = getAppContextWithUserOrThrow(context);

  if (!ability.can("see", "user-profile-page")) {
    throw data({ code: "FORBIDDEN" }, { status: 403 });
  }

  return data({
    document: {
      title: intl.formatMessage({
        id: "vdeovA",
        defaultMessage: "Profile",
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

  const user = useUserOrThrow();

  return (
    <Stack gap={0}>
      <Title order={3}>
        {intl.formatMessage({
          id: "APHalK",
          defaultMessage: "Profile",
          description: "Page title.",
        })}
      </Title>

      <Paper component="pre" p="md">
        {JSON.stringify(user.profile, null, 2)}
      </Paper>
    </Stack>
  );
}
