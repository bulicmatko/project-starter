import {
  TbArrowLeft,
  TbError404,
  TbHome,
  TbMail,
  TbSearch,
} from "react-icons/tb";

import {
  Badge,
  Button,
  Card,
  Center,
  Code,
  Container,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";

type BaseProps = {
  /** Optional: path the user tried to access (404) or current path (500 context) */
  requestedPath?: string;
  /** Optional: trace/request id for support */
  requestId?: string;
  /** Support email */
  contactEmail?: string; // default: 'support@example.com'
  /** Primary actions */
  onHome?: () => void;
  onBack?: () => void;
  /** 404-only: search action */
  onSearch?: () => void;
  /** 500-only: retry action */
  onRetry?: () => void;
  /** i18n / label overrides */
  labels?: Partial<{
    // shared
    contactSupport: string;
    back: string;
    home: string;
    requestId: string;
    support: string;
    attemptedResource: string;

    // 404
    title404: string;
    subtitle404: string;
    why404: string;
    search: string;

    // 500
    title500: string;
    subtitle500: string;
    why500: string;
    retry: string;
    reportIssue: string;
  }>;
};

/* ----------------------------- 404 Splash ----------------------------- */

export function Error404({
  requestedPath,
  contactEmail = "support@example.com",
  onHome,
  onBack,
  onSearch,
  labels,
}: BaseProps) {
  const L = {
    title404: "Page not found",
    subtitle404:
      "The page you’re looking for doesn’t exist, was moved, or the URL is incorrect (404).",
    why404: "Why this happened",
    search: "Search",
    contactSupport: "Contact support",
    back: "Go back",
    home: "Go to Home",
    attemptedResource: "Attempted resource",
    ...labels,
  };

  return (
    <Container size="md" py="xl" style={{ minHeight: "100vh" }}>
      <Center style={{ height: "100%" }}>
        <Paper
          radius="xl"
          p="xl"
          style={{
            width: "100%",
            backdropFilter: "blur(8px)",
            background:
              "linear-gradient(180deg, rgba(99,102,241,0.08) 0%, rgba(56,189,248,0.08) 100%)",
          }}
        >
          <Stack gap="lg" align="center">
            <ThemeIcon
              size={96}
              radius="xl"
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
            >
              <TbError404 size={56} />
            </ThemeIcon>

            <Group gap="xs" align="center">
              <Title order={1} ta="center">
                {L.title404}
              </Title>
              <Badge variant="light" color="gray" size="lg" radius="sm">
                404
              </Badge>
            </Group>

            <Text c="dimmed" ta="center" size="sm" maw={720}>
              {L.subtitle404}
            </Text>

            {requestedPath && (
              <Card radius="md" p="md" w="100%" maw={640}>
                <Text size="sm" c="dimmed">
                  {L.attemptedResource}
                </Text>
                <Code fz="sm">{requestedPath}</Code>
              </Card>
            )}

            <Divider w="100%" label={L.why404} labelPosition="center" />

            <Stack gap="xs" maw={720} w="100%">
              <Text ta="center">
                <Text span={true} fw={600}>
                  Incorrect URL
                </Text>{" "}
                — Double-check for typos or outdated bookmarks.
              </Text>
              <Text ta="center">
                <Text span={true} fw={600}>
                  Moved or deleted
                </Text>{" "}
                — The resource may have been moved or removed.
              </Text>
              <Text ta="center">
                <Text span={true} fw={600}>
                  Access changed
                </Text>{" "}
                — The content could now require permission.
              </Text>
            </Stack>

            <Group mt="xs" justify="center" wrap="wrap">
              {onSearch && (
                <Button leftSection={<TbSearch size={18} />} onClick={onSearch}>
                  {L.search}
                </Button>
              )}
              {onBack && (
                <Button
                  variant="light"
                  leftSection={<TbArrowLeft size={18} />}
                  onClick={onBack}
                >
                  {L.back}
                </Button>
              )}
              {onHome && (
                <Button
                  variant="subtle"
                  leftSection={<TbHome size={18} />}
                  onClick={onHome}
                >
                  {L.home}
                </Button>
              )}
              {contactEmail && (
                <Button
                  variant="outline"
                  leftSection={<TbMail size={18} />}
                  component="a"
                  href={`mailto:${contactEmail}?subject=Help%20with%20404`}
                >
                  {L.contactSupport}
                </Button>
              )}
            </Group>
          </Stack>
        </Paper>
      </Center>
    </Container>
  );
}
