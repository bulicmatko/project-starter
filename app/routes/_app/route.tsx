import { useEffect, useState } from "react";
import type { unstable_MiddlewareFunction as MiddlewareFunction } from "react-router";
import {
  Link,
  NavLink,
  Outlet,
  data,
  href,
  useLocation,
  useRevalidator,
} from "react-router";
import { useIntl } from "react-intl";
import {
  TbAdjustments,
  TbExternalLink,
  TbLogout,
  TbSearch,
  TbUser,
  TbUserCog,
} from "react-icons/tb";

import {
  Anchor,
  AppShell,
  Box,
  Burger,
  Container,
  Divider,
  Group,
  Highlight,
  NavLink as MantineNavLink,
  Menu,
  Stack,
  Text,
  Transition,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Spotlight, createSpotlight } from "@mantine/spotlight";

import { useAuth, useUserOrThrow } from "~/core/auth/react";

import { UserAvatar } from "~/ui/components/user-avatar";

import { getAppContextWithUserOrThrow } from "~/context";
import { authenticated, enabled } from "~/middleware";

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
  authenticated({ redirectTo: href("/auth/sign-in") }),
  enabled(),
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
  const { intl } = getAppContextWithUserOrThrow(context);

  return data({
    document: {
      title: intl.formatMessage({
        id: "+5WJ1D",
        defaultMessage: "App",
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

  const auth = useAuth();
  const user = useUserOrThrow();

  const location = useLocation();
  const revalidator = useRevalidator();

  const [
    isMobileMenuOpen,
    { toggle: toggleMobileMenu, close: closeMobileMenu },
  ] = useDisclosure(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  const navigation = [
    {
      label: intl.formatMessage({
        id: "1laLiC",
        defaultMessage: "Main Menu",
        description: "Navigation item label.",
      }),
      items: [
        {
          isVisible: true,
          href: href("/"),
          label: intl.formatMessage({
            id: "Rxkpix",
            defaultMessage: "Home",
            description: "Navigation item label.",
          }),
        },
        {
          isVisible: true,
          href: href("/admin"),
          label: intl.formatMessage({
            id: "D+0fuV",
            defaultMessage: "Admin",
            description: "Navigation item label.",
          }),
        },
      ].filter(({ isVisible }) => isVisible),
    },
  ].filter(({ items }) => items.length > 0);

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
                id: "EyrwEp",
                defaultMessage: "App",
                description: "Layout title.",
              })}
            </Text>

            <Group gap="xs" wrap="nowrap" ml="auto">
              <Group gap="xs" wrap="nowrap" ml="auto">
                <Menu trigger="hover" position="bottom-end">
                  <Menu.Target>
                    <UnstyledButton>
                      <UserAvatar
                        variant="filled"
                        size="sm"
                        user={user}
                        tooltipProps={{ disabled: true }}
                      />
                    </UnstyledButton>
                  </Menu.Target>

                  <Menu.Dropdown
                    miw={rem(220)}
                    style={{ transform: `translateX(${rem(5)})` }}
                  >
                    <Menu.Label fz="xs" fw="bold">
                      {user.profile.displayName}
                    </Menu.Label>

                    <Menu.Item
                      component={Link}
                      to={href("/profile")}
                      prefetch="intent"
                      leftSection={<Box component={TbUser} />}
                    >
                      {intl.formatMessage({
                        id: "SiTUHJ",
                        defaultMessage: "Profile",
                        description: "Navigation item label.",
                      })}
                    </Menu.Item>

                    <Menu.Item
                      component={Link}
                      to={href("/preferences")}
                      prefetch="intent"
                      leftSection={<Box component={TbAdjustments} />}
                    >
                      {intl.formatMessage({
                        id: "WDCe+t",
                        defaultMessage: "Preferences",
                        description: "Navigation item label.",
                      })}
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Item
                      component={Link}
                      to={href("/admin")}
                      prefetch="intent"
                      leftSection={<Box component={TbUserCog} />}
                    >
                      {intl.formatMessage({
                        id: "D+0fuV",
                        defaultMessage: "Admin",
                        description: "Navigation item label.",
                      })}
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Item
                      c="red"
                      leftSection={<Box component={TbLogout} />}
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      onClick={async () => {
                        await auth.signOut();
                        await revalidator.revalidate();
                      }}
                    >
                      {intl.formatMessage({
                        id: "yjOVEV",
                        defaultMessage: "Sign out",
                        description: "Navigation item label.",
                      })}
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Group>
          </Group>
        </Box>
        {/* </DesktopHeader> */}

        {/* <MobileHeader> */}
        <Box hiddenFrom={MOBILE_BREAKPOINT}>
          <Group justify="space-between" px="sm" h={rem(HEADER_MOBILE_HEIGHT)}>
            <Group w={rem(28)}>
              <Burger
                size="sm"
                opened={isMobileMenuOpen}
                onClick={toggleMobileMenu}
              />
            </Group>

            <Anchor
              component={Link}
              to={href("/")}
              prefetch="intent"
              fw="bold"
              td="none"
            >
              {__APP_NAME__}
            </Anchor>

            <Group w={rem(28)}></Group>
          </Group>
        </Box>
        {/* </MobileHeader> */}

        {/* <MobileMenu> */}
        <Transition mounted={isMobileMenuOpen} transition="fade">
          {(transitionStyles) => (
            <Box
              hiddenFrom={MOBILE_BREAKPOINT}
              style={{
                position: "fixed",
                zIndex: 10,
                top: rem(HEADER_MOBILE_HEIGHT),
                right: 0,
                bottom: 0,
                left: 0,
                height: `calc(100dvh - ${rem(HEADER_MOBILE_HEIGHT)})`,
                backgroundColor: "var(--app-foreground-color)",
                ...transitionStyles,
              }}
            >
              <Box
                // NOTE: 78px is the height of MobileUserButton component
                h={`calc(100dvh - ${rem(HEADER_MOBILE_HEIGHT + 78)})`}
                pb="lg"
                style={{ overflowY: "auto" }}
              >
                {navigation.map((menu, i) => (
                  <MantineNavLink
                    key={i}
                    label={menu.label}
                    defaultOpened={menu.items.some((item) =>
                      location.pathname.startsWith(item.href),
                    )}
                    active={menu.items.some((item) =>
                      location.pathname.startsWith(item.href),
                    )}
                    px="lg"
                    py="md"
                    styles={{
                      label: {
                        whiteSpace: "nowrap",
                      },
                      collapse: {
                        paddingTop: rem(10),
                        paddingBottom: rem(10),
                      },
                    }}
                  >
                    {menu.items.map((item, j) => (
                      <MantineNavLink
                        key={j}
                        component={NavLink}
                        to={item.href}
                        prefetch="intent"
                        label={item.label}
                        px="xl"
                        py="md"
                        styles={{
                          label: {
                            whiteSpace: "nowrap",
                          },
                          root: {
                            marginBottom: rem(10),
                          },
                        }}
                        onClick={closeMobileMenu}
                      />
                    ))}
                  </MantineNavLink>
                ))}
              </Box>

              <Divider />

              <Menu trigger="click-hover" position="top">
                <Menu.Target>
                  <UnstyledButton w="100%">
                    <Group gap="md" p="lg">
                      <UserAvatar
                        variant="filled"
                        size="md"
                        user={user}
                        tooltipProps={{ disabled: true }}
                      />

                      <Stack gap={0}>
                        <Text fw="bold">{user.profile.displayName}</Text>
                        <Text fz="xs" c="dimmed">
                          {user.email}
                        </Text>
                      </Stack>
                    </Group>
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown miw={`calc(100dvw - ${rem(10)})`}>
                  <Menu.Label fz="xs" fw="bold">
                    {user.profile.displayName}
                  </Menu.Label>

                  <Menu.Item
                    component={Link}
                    to={href("/profile")}
                    prefetch="intent"
                    leftSection={<Box component={TbUser} />}
                    rightSection={<Box component={TbExternalLink} />}
                    onClick={closeMobileMenu}
                  >
                    {intl.formatMessage({
                      id: "SiTUHJ",
                      defaultMessage: "Profile",
                      description: "Navigation item label.",
                    })}
                  </Menu.Item>

                  <Menu.Item
                    component={Link}
                    to={href("/preferences")}
                    prefetch="intent"
                    leftSection={<Box component={TbAdjustments} />}
                    rightSection={<Box component={TbExternalLink} />}
                    onClick={closeMobileMenu}
                  >
                    {intl.formatMessage({
                      id: "WDCe+t",
                      defaultMessage: "Preferences",
                      description: "Navigation item label.",
                    })}
                  </Menu.Item>

                  <Menu.Divider />

                  <Menu.Item
                    component={Link}
                    to={href("/admin")}
                    prefetch="intent"
                    leftSection={<Box component={TbUserCog} />}
                  >
                    {intl.formatMessage({
                      id: "D+0fuV",
                      defaultMessage: "Admin",
                      description: "Navigation item label.",
                    })}
                  </Menu.Item>

                  <Menu.Divider />

                  <Menu.Item
                    c="red"
                    leftSection={<Box component={TbLogout} />}
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={async () => {
                      await auth.signOut();
                      await revalidator.revalidate();
                    }}
                  >
                    {intl.formatMessage({
                      id: "yjOVEV",
                      defaultMessage: "Sign out",
                      description: "Navigation item label.",
                    })}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Box>
          )}
        </Transition>
        {/* </MobileMenu> */}
      </AppShell.Header>

      <AppShell.Main>
        <NavigationSpotlight navigation={navigation} />

        <Container size="xl" py="md">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

/**
 * Navigation Spotlight
 * */
const [navigationSpotlight] = createSpotlight();

/**
 * Navigation Spotlight
 * */
function NavigationSpotlight({
  toogleHotKey = "/",
  navigation,
}: {
  toogleHotKey?: string;
  navigation: Array<{
    label: string;
    items: Array<{
      href: string;
      label: string;
    }>;
  }>;
}) {
  const intl = useIntl();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredNavigation = navigation
    .map((menu) => ({
      ...menu,
      items: menu.items.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter(({ items }) => items.length > 0);

  return (
    <Spotlight.Root
      store={navigationSpotlight}
      shortcut={[toogleHotKey]}
      query={searchQuery}
      onQueryChange={setSearchQuery}
      styles={{ body: { overflowX: "hidden" } }}
    >
      <Spotlight.Search
        leftSection={<Box component={TbSearch} />}
        placeholder={intl.formatMessage({
          id: "99nTlc",
          defaultMessage: "Navigate to...",
          description: "Spotlight search placeholder.",
        })}
        value={searchQuery}
      />

      <Spotlight.ActionsList mih={rem(380)} mah={rem(380)}>
        <Stack gap="sm">
          {filteredNavigation.map((menu, i) => (
            <Spotlight.ActionsGroup key={i} label={menu.label}>
              <Stack gap={0} py={rem(5)}>
                {menu.items.map((item, j) => (
                  <UnstyledButton
                    key={j}
                    component={Link}
                    prefetch="intent"
                    to={item.href}
                  >
                    <Spotlight.Action py="xs">
                      <Group gap="sm" wrap="nowrap" w="100%">
                        <Highlight highlight={searchQuery}>
                          {item.label}
                        </Highlight>
                      </Group>
                    </Spotlight.Action>
                  </UnstyledButton>
                ))}
              </Stack>
            </Spotlight.ActionsGroup>
          ))}
        </Stack>

        {filteredNavigation.length === 0 && (
          <Spotlight.Empty fz="sm">
            {intl.formatMessage({
              id: "bFEQ3C",
              defaultMessage: "No results found.",
              description: "Spotlight empty message.",
            })}
          </Spotlight.Empty>
        )}
      </Spotlight.ActionsList>
    </Spotlight.Root>
  );
}
