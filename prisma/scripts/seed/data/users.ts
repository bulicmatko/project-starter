/**
 * Users
 * */
export const users = [
  {
    email: "bulicmatko@gmail.com",
    password: "developer",
    profile: {
      firstName: "Matko",
      lastName: "Bulić",
    },
    preferences: {
      locale: "hr",
      timezone: "Europe/Zagreb",
      firstDayOfWeek: 1, // 0 = Sunday | 1 = Monday | 2 = Tuesday | 3 = Wednesday | 4 = Thursday | 5 = Friday | 6 = Saturday
      accentColor: "blue", // "blue" | "cyan" | "grape" | "green" | "indigo" | "lime" | "orange" | "pink" | "red" | "teal" | "violet" | "yellow"
      colorScheme: "auto", // "light" | "dark" | "auto"
    },
  },
] as const;
