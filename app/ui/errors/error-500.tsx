import {
  TbArrowLeft,
  TbBug,
  TbClipboard,
  TbClipboardCheck,
  TbHome,
  TbMail,
  TbRefresh,
  TbServerBolt,
} from "react-icons/tb";

import {
  Badge,
  Button,
  Card,
  Center,
  Code,
  Container,
  CopyButton,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
  rem,
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

export function Error500({
  requestedPath,
  requestId,
  contactEmail = "support@example.com",
  onHome,
  onBack,
  onRetry,
  labels,
}: BaseProps) {
  const L = {
    title500: "Something went wrong",
    subtitle500:
      "An unexpected error occurred on our side. It’s not you—it’s us (500).",
    why500: "What might have happened",
    retry: "Try again",
    reportIssue: "Report a problem",
    contactSupport: "Contact support",
    back: "Go back",
    home: "Go to Home",
    requestId: "Request ID",
    attemptedResource: "Context",
    support: "Support",
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
              "linear-gradient(180deg, rgba(250,82,82,0.08) 0%, rgba(255,212,59,0.08) 100%)",
          }}
        >
          <Stack gap="lg" align="center">
            <ThemeIcon
              size={96}
              radius="xl"
              variant="gradient"
              gradient={{ from: "red", to: "yellow" }}
            >
              <TbServerBolt size={56} />
            </ThemeIcon>

            <Group gap="xs" align="center">
              <Title order={1} ta="center">
                {L.title500}
              </Title>
              <Badge variant="light" color="red" size="lg" radius="sm">
                500
              </Badge>
            </Group>

            <Text c="dimmed" ta="center" size="sm" maw={720}>
              {L.subtitle500}
            </Text>

            {(requestedPath ?? requestId) && (
              <Card radius="md" p="md" w="100%" maw={640}>
                <Stack gap="xs">
                  {requestedPath && (
                    <Group justify="space-between" wrap="nowrap">
                      <Text size="sm" c="dimmed" style={{ minWidth: rem(96) }}>
                        {L.attemptedResource}
                      </Text>
                      <Code fz="sm">{requestedPath}</Code>
                    </Group>
                  )}
                  {requestId && (
                    <Group justify="space-between" wrap="nowrap">
                      <Text size="sm" c="dimmed" style={{ minWidth: rem(96) }}>
                        {L.requestId}
                      </Text>
                      <Group gap="xs" wrap="nowrap">
                        <Code fz="sm">{requestId}</Code>
                        <CopyButton value={requestId}>
                          {({ copied, copy }) => (
                            <Tooltip label={copied ? "Copied" : "Copy"}>
                              <Button
                                variant="subtle"
                                size="xs"
                                onClick={copy}
                                leftSection={
                                  copied ? (
                                    <TbClipboardCheck size={16} />
                                  ) : (
                                    <TbClipboard size={16} />
                                  )
                                }
                              >
                                {copied ? "Copied" : "Copy"}
                              </Button>
                            </Tooltip>
                          )}
                        </CopyButton>
                      </Group>
                    </Group>
                  )}
                </Stack>
              </Card>
            )}

            <Divider w="100%" label={L.why500} labelPosition="center" />

            <Stack gap="xs" maw={720} w="100%">
              <Text ta="center">
                <Text component="span" fw={600}>
                  Temporary outage
                </Text>{" "}
                — A service we depend on may be down.
              </Text>
              <Text ta="center">
                <Text component="span" fw={600}>
                  Unexpected exception
                </Text>{" "}
                — We hit an unhandled error while processing your request.
              </Text>
              <Text ta="center">
                <Text component="span" fw={600}>
                  Deployment in progress
                </Text>{" "}
                — A new release might be rolling out.
              </Text>
            </Stack>

            <Group mt="xs" justify="center" wrap="wrap">
              {onRetry && (
                <Button leftSection={<TbRefresh size={18} />} onClick={onRetry}>
                  {L.retry}
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
                  href={`mailto:${contactEmail}${requestId ? `?subject=Help%20with%20500%20(Request%20ID%3A%20${encodeURIComponent(requestId)})` : ""}`}
                >
                  {L.contactSupport}
                </Button>
              )}
              {contactEmail && (
                <Button
                  variant="default"
                  leftSection={<TbBug size={18} />}
                  component="a"
                  href={`mailto:${contactEmail}${requestId ? `?subject=Bug%20report%20(Request%20ID%3A%20${encodeURIComponent(requestId)})` : ""}`}
                >
                  {L.reportIssue}
                </Button>
              )}
            </Group>
          </Stack>
        </Paper>
      </Center>
    </Container>
  );
}
