import { Suspense } from "react";
import { Await, data } from "react-router";
import { useIntl } from "react-intl";

import { BarChart } from "@mantine/charts";
import { Paper, SimpleGrid, Skeleton, Stack, Title, rem } from "@mantine/core";
import dayjs from "dayjs";

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

  if (!ability.can("see", "dashboard-page")) {
    throw data({ code: "FORBIDDEN" }, { status: 403 });
  }

  async function getBarChart() {
    const today = dayjs();

    function random(min: number, max: number) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      data: Array.from({ length: 7 }).map((_, index) => {
        const date = today.subtract(index, "day").format("MMM DD");

        const delivered = random(200, 500);
        const rejected = random(100, 200);
        const sent = delivered + rejected;

        return { date, delivered, rejected, sent };
      }),
    };
  }

  return data({
    document: {
      title: intl.formatMessage({
        id: "lQE+HP",
        defaultMessage: "Dashboard",
        description: "Document title.",
      }),
    },
    // NOTE: Not awaited!
    barChartPromise: getBarChart(),
  });
}

/**
 * Component
 * */
export default function Component({ loaderData }: Route.ComponentProps) {
  const { barChartPromise } = loaderData;

  const intl = useIntl();

  return (
    <Stack>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
        {Array.from({ length: 4 }).map((_, index) => (
          <Paper key={index} p="md">
            <Title order={4} mb="lg">
              {intl.formatMessage({
                id: "uGKHsK",
                defaultMessage: "Message Stats",
                description: "Chart title.",
              })}
            </Title>

            <Suspense fallback={<Skeleton height={rem(200)} />}>
              <Await resolve={barChartPromise}>
                {(barChart) => (
                  <BarChart
                    h={rem(200)}
                    data={barChart.data}
                    dataKey="date"
                    series={[
                      {
                        name: "delivered",
                        color: "teal",
                        label: intl.formatMessage({
                          id: "SEm4mS",
                          defaultMessage: "Delivered",
                          description: "Chart label.",
                        }),
                      },
                      {
                        name: "rejected",
                        color: "red",
                        label: intl.formatMessage({
                          id: "uwGqG9",
                          defaultMessage: "Rejected",
                          description: "Chart label.",
                        }),
                      },
                      {
                        name: "sent",
                        color: "yellow",
                        label: intl.formatMessage({
                          id: "5TndCn",
                          defaultMessage: "Sent",
                          description: "Chart label.",
                        }),
                      },
                    ]}
                  />
                )}
              </Await>
            </Suspense>
          </Paper>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
