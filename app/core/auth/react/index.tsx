import type { ReactNode } from "react";
import { createContext, useContext } from "react";

import { createAuthClient } from "better-auth/react";

import type { User } from "~/core/auth";

/**
 * Auth
 * */
const auth = createAuthClient({
  basePath: "/api/auth",
});

/**
 * Use Auth Hook
 * */
export function useAuth() {
  return {
    signUpWithEmailAndPassword: async (
      {
        name,
        email,
        password,
      }: {
        name: string;
        email: string;
        password: string;
      },
      {
        onError,
        onSuccess,
      }: {
        onError: (error: Error) => unknown;
        onSuccess: () => unknown;
      },
    ) => {
      await auth.signUp.email(
        { name, email, password },
        {
          onError: ({ error }) => {
            onError(error);
          },
          onSuccess: () => {
            onSuccess();
          },
        },
      );
    },
    signInWithEmailAndPassword: async (
      {
        email,
        password,
      }: {
        email: string;
        password: string;
      },
      {
        onError,
        onSuccess,
      }: {
        onError: (error: Error) => unknown;
        onSuccess: () => unknown;
      },
    ) => {
      await auth.signIn.email(
        { email, password },
        {
          onError: ({ error }) => {
            onError(error);
          },
          onSuccess: () => {
            onSuccess();
          },
        },
      );
    },
    signOut: () => auth.signOut(),
  };
}

/**
 * User Context
 * */
const UserContext = createContext<User | null>(null);

/**
 * User Provider
 * */
export function UserProvider({
  user,
  children,
}: {
  user: User | null;
  children: ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

/**
 * Use User Hook
 * */
export function useUser() {
  return useContext(UserContext);
}

/**
 * Use User Or Throw Hook
 * */
export function useUserOrThrow() {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error("USER_NOT_PROVIDED!");
  }

  return user;
}
