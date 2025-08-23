import type { AvatarProps, TooltipProps } from "@mantine/core";
import { Avatar, Tooltip } from "@mantine/core";

/**
 * Constants
 * */
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const COLORS = [
  "blue",
  "cyan",
  "grape",
  "green",
  "indigo",
  "lime",
  "orange",
  "pink",
  "red",
  "teal",
  "violet",
  "yellow",
];

/**
 * User Avatar
 * */
export function UserAvatar({
  user,
  tooltipProps,
  ...avatarProps
}: Omit<AvatarProps, "children"> & {
  user: {
    id: string;
    email: string;
    profile: {
      avatarUrl: string | null;
      displayName: string;
      firstName: string;
      lastName: string;
      initials: string;
    };
  };
  tooltipProps?: Omit<TooltipProps, "label" | "children">;
}) {
  const colorIndex =
    LETTERS.indexOf(user.profile.initials.charAt(0).toUpperCase()) +
    LETTERS.indexOf(user.profile.initials.charAt(1).toUpperCase());

  const color = COLORS[Math.abs(colorIndex) % COLORS.length];

  return (
    <Tooltip label={user.profile.displayName} {...tooltipProps}>
      <Avatar src={user.profile.avatarUrl} color={color} {...avatarProps}>
        {user.profile.initials}
      </Avatar>
    </Tooltip>
  );
}
