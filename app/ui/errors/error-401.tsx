import {
  TbAlertCircle,
  TbArrowLeft,
  TbClipboard,
  TbClipboardCheck,
  TbHome,
  TbKey,
  TbLock,
  TbLogin,
  TbMail,
} from "react-icons/tb";

import {
  Badge,
  Button,
  Card,
  Code,
  Container,
  CopyButton,
  Divider,
  Group,
  List,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
  rem,
} from "@mantine/core";

type Error401Props = {
  /** If you have a request/trace id for support */
  requestId?: string;
  /** Path the user tried to access (helps them orient) */
  requestedPath?: string;
  /** Email to contact support */
  contactEmail?: string; // e.g. 'support@yourapp.com'
  /** Called when user clicks “Sign in” */
  onSignIn?: () => void;
  /** Optional: back handler */
  onBack?: () => void;
  /** Optional: go home handler */
  onHome?: () => void;
  /** Optional extra action (e.g., “Request access”) */
  onRequestAccess?: () => void;
  /** Label overrides */
  labels?: Partial<{
    title: string;
    subtitle: string;
    signIn: string;
    back: string;
    home: string;
    requestAccess: string;
    contactSupport: string;
  }>;
};

export function Error401({
  requestId,
  requestedPath,
  contactEmail = "support@example.com",
  onSignIn,
  onBack,
  onHome,
  onRequestAccess,
  labels,
}: Error401Props) {
  const L = {
    title: "Unauthorized",
    subtitle: "You don’t have permission to view this page (401).",
    signIn: "Sign in",
    back: "Go back",
    home: "Go to Home",
    requestAccess: "Request access",
    contactSupport: "Contact support",
    ...labels,
  };

  return (
    <Container size="sm" py="xl">
      <Paper
        radius="lg"
        p="xl"
        style={{
          backdropFilter: "blur(6px)",
        }}
      >
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Group gap="sm">
              <ThemeIcon
                size={48}
                radius="xl"
                variant="gradient"
                gradient={{ from: "violet", to: "indigo" }}
              >
                <TbLock size={28} />
              </ThemeIcon>
              <div>
                <Group gap="xs">
                  <Title order={2}>{L.title}</Title>
                  <Badge variant="light" color="red" size="sm" radius="sm">
                    401
                  </Badge>
                </Group>
                <Text c="dimmed" size="sm">
                  {L.subtitle}
                </Text>
              </div>
            </Group>
          </Group>

          {requestedPath && (
            <Card radius="md" p="md">
              <Text size="sm" c="dimmed">
                Attempted resource
              </Text>
              <Code fz="sm">{requestedPath}</Code>
            </Card>
          )}

          <Divider label="Why am I seeing this?" labelPosition="left" />

          <List
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon color="yellow" variant="light" radius="xl">
                <TbAlertCircle size={16} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <Text>
                <Text span={true} fw={600}>
                  Not signed in
                </Text>{" "}
                — You need to authenticate before accessing this page.
              </Text>
            </List.Item>
            <List.Item>
              <Text>
                <Text span={true} fw={600}>
                  Insufficient permissions
                </Text>{" "}
                — Your account doesn’t have the required role or scope.
              </Text>
            </List.Item>
            <List.Item>
              <Text>
                <Text span={true} fw={600}>
                  Session expired
                </Text>{" "}
                — Your session may have timed out. Signing in again usually
                fixes it.
              </Text>
            </List.Item>
          </List>

          <Divider label="What you can do" labelPosition="left" />

          <Group wrap="wrap">
            {onSignIn && (
              <Button leftSection={<TbLogin size={18} />} onClick={onSignIn}>
                {L.signIn}
              </Button>
            )}

            {onRequestAccess && (
              <Button
                variant="light"
                leftSection={<TbKey size={18} />}
                onClick={onRequestAccess}
              >
                {L.requestAccess}
              </Button>
            )}

            {onBack && (
              <Button
                variant="subtle"
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
                href={`mailto:${contactEmail}${requestId ? `?subject=Access%20help%20(Request%20ID%3A%20${encodeURIComponent(requestId)})` : ""}`}
              >
                {L.contactSupport}
              </Button>
            )}
          </Group>

          {(requestId ?? contactEmail) && (
            <Card radius="md" p="md">
              <Group justify="space-between" align="center">
                <div>
                  <Text size="sm" fw={600}>
                    Need help?
                  </Text>
                  <Text size="sm" c="dimmed">
                    Send us the details below so we can assist quickly.
                  </Text>
                </div>
              </Group>

              <Stack gap="xs" mt="sm">
                {requestId && (
                  <Group justify="space-between" wrap="nowrap">
                    <Text size="sm" c="dimmed" style={{ minWidth: rem(96) }}>
                      Request ID
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

                {contactEmail && (
                  <Group justify="space-between" wrap="nowrap">
                    <Text size="sm" c="dimmed" style={{ minWidth: rem(96) }}>
                      Support
                    </Text>
                    <Code fz="sm">{contactEmail}</Code>
                  </Group>
                )}
              </Stack>
            </Card>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}
