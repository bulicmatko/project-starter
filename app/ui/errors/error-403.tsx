// Error403.tsx

import React from "react";
import {
  TbArrowLeft,
  TbBan,
  TbClipboard,
  TbClipboardCheck,
  TbHome,
  TbKey,
  TbMail,
  TbShieldLock,
  TbSwitch,
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

type Error403Props = {
  /** Optional: path the user tried to access */
  requestedPath?: string;
  /** Optional: trace/request id for support */
  requestId?: string;
  /** Optional: show which role/scope is needed */
  requiredRoleOrScope?: string; // e.g. 'admin', 'billing:read'
  /** Support email */
  contactEmail?: string; // default: 'support@example.com'
  /** Actions */
  onRequestAccess?: () => void;
  onSwitchAccount?: () => void;
  onBack?: () => void;
  onHome?: () => void;
  /** Labels override for i18n */
  labels?: Partial<{
    title: string;
    subtitle: string;
    whyHeader: string;
    whatNowHeader: string;
    requestAccess: string;
    switchAccount: string;
    back: string;
    home: string;
    contactSupport: string;
    attemptedResource: string;
    requiredPermission: string;
    needHelpTitle: string;
    needHelpSubtitle: string;
    requestId: string;
    support: string;
  }>;
};

export function Error403({
  requestedPath,
  requestId,
  requiredRoleOrScope,
  contactEmail = "support@example.com",
  onRequestAccess,
  onSwitchAccount,
  onBack,
  onHome,
  labels,
}: Error403Props) {
  const L = {
    title: "Access forbidden",
    subtitle:
      "You are signed in but do not have permission to view this page (403).",
    whyHeader: "Why am I seeing this?",
    whatNowHeader: "What you can do",
    requestAccess: "Request access",
    switchAccount: "Switch account",
    back: "Go back",
    home: "Go to Home",
    contactSupport: "Contact support",
    attemptedResource: "Attempted resource",
    requiredPermission: "Required permission",
    needHelpTitle: "Need help?",
    needHelpSubtitle: "Send us the details below so we can assist quickly.",
    requestId: "Request ID",
    support: "Support",
    ...labels,
  };

  return (
    <Container size="sm" py="xl">
      <Paper radius="lg" p="xl" style={{ backdropFilter: "blur(6px)" }}>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Group gap="sm">
              <ThemeIcon
                size={48}
                radius="xl"
                variant="gradient"
                gradient={{ from: "orange", to: "red" }}
              >
                <TbShieldLock size={28} />
              </ThemeIcon>
              <div>
                <Group gap="xs">
                  <Title order={2}>{L.title}</Title>
                  <Badge variant="light" color="red" size="sm" radius="sm">
                    403
                  </Badge>
                </Group>
                <Text c="dimmed" size="sm">
                  {L.subtitle}
                </Text>
              </div>
            </Group>
          </Group>

          {(requestedPath ?? requiredRoleOrScope) && (
            <Card radius="md" p="md">
              <Stack gap="xs">
                {requestedPath && (
                  <div>
                    <Text size="sm" c="dimmed">
                      {L.attemptedResource}
                    </Text>
                    <Code fz="sm">{requestedPath}</Code>
                  </div>
                )}
                {requiredRoleOrScope && (
                  <div>
                    <Text size="sm" c="dimmed">
                      {L.requiredPermission}
                    </Text>
                    <Code fz="sm">{requiredRoleOrScope}</Code>
                  </div>
                )}
              </Stack>
            </Card>
          )}

          <Divider label={L.whyHeader} labelPosition="left" />

          <List
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon color="yellow" variant="light" radius="xl">
                <TbBan size={16} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <Text>
                <Text span={true} fw={600}>
                  Insufficient permissions
                </Text>{" "}
                — Your account is authenticated but lacks the required role or
                scope
                {requiredRoleOrScope ? (
                  <>
                    {" "}
                    (<Code fz="sm">{requiredRoleOrScope}</Code>)
                  </>
                ) : null}
                .
              </Text>
            </List.Item>
            <List.Item>
              <Text>
                <Text span={true} fw={600}>
                  Restricted resource
                </Text>{" "}
                — The page or data is limited to certain teams, plans, or
                environments.
              </Text>
            </List.Item>
            <List.Item>
              <Text>
                <Text span={true} fw={600}>
                  Organization policy
                </Text>{" "}
                — Access may be blocked by workspace or organization rules.
              </Text>
            </List.Item>
          </List>

          <Divider label={L.whatNowHeader} labelPosition="left" />

          <Group wrap="wrap">
            {onRequestAccess && (
              <Button
                leftSection={<TbKey size={18} />}
                onClick={onRequestAccess}
              >
                {L.requestAccess}
              </Button>
            )}
            {onSwitchAccount && (
              <Button
                variant="light"
                leftSection={<TbSwitch size={18} />}
                onClick={onSwitchAccount}
              >
                {L.switchAccount}
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
                    {L.needHelpTitle}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {L.needHelpSubtitle}
                  </Text>
                </div>
              </Group>

              <Stack gap="xs" mt="sm">
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

                {contactEmail && (
                  <Group justify="space-between" wrap="nowrap">
                    <Text size="sm" c="dimmed" style={{ minWidth: rem(96) }}>
                      {L.support}
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
