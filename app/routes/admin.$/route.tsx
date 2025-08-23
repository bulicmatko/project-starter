import { data } from "react-router";
import { useIntl } from "react-intl";

import { Center, Title } from "@mantine/core";

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
  const { intl } = getAppContextWithUserOrThrow(context);

  return data(
    {
      document: {
        title: intl.formatMessage({
          id: "0mmwyi",
          defaultMessage: "Page Not Found",
          description: "Document title.",
        }),
      },
    },
    { status: 404 },
  );
}

/**
 * Component
 * */
// eslint-disable-next-line no-empty-pattern
export default function Component({}: Route.ComponentProps) {
  const intl = useIntl();

  return (
    <Center p="xl">
      <Title order={1}>
        {intl.formatMessage({
          id: "y2Q49/",
          defaultMessage: "Page Not Found",
          description: "Page title.",
        })}
      </Title>
    </Center>
  );
}
