import { createIntl, createIntlCache } from "react-intl";

/**
 * Get Supported Locale
 * */
function getSupportedLocale(locale?: string) {
  switch (locale) {
    case "hr":
    case "de":
    case "es":
    case "fr":
    case "it":
      return locale;

    case "en":
    default: {
      return "en";
    }
  }
}

/**
 * Get Messages
 * */
async function getMessages(locale?: ReturnType<typeof getSupportedLocale>) {
  switch (locale) {
    case "hr": {
      const [messages] = await Promise.all([
        import("./messages/hr/compiled.json").then(
          ({ default: messages }) => messages,
        ),
        import("dayjs/locale/hr"),
      ]);

      return { ...messages };
    }

    case "de": {
      const [messages] = await Promise.all([
        import("./messages/de/compiled.json").then(
          ({ default: messages }) => messages,
        ),
        import("dayjs/locale/de"),
      ]);

      return { ...messages };
    }

    case "es": {
      const [messages] = await Promise.all([
        import("./messages/es/compiled.json").then(
          ({ default: messages }) => messages,
        ),
        import("dayjs/locale/es"),
      ]);

      return { ...messages };
    }

    case "fr": {
      const [messages] = await Promise.all([
        import("./messages/fr/compiled.json").then(
          ({ default: messages }) => messages,
        ),
        import("dayjs/locale/fr"),
      ]);

      return { ...messages };
    }

    case "it": {
      const [messages] = await Promise.all([
        import("./messages/it/compiled.json").then(
          ({ default: messages }) => messages,
        ),
        import("dayjs/locale/it"),
      ]);

      return { ...messages };
    }

    case "en":
    default: {
      const [messages] = await Promise.all([
        import("./messages/en/compiled.json").then(
          ({ default: messages }) => messages,
        ),
        import("dayjs/locale/en"),
      ]);

      return { ...messages };
    }
  }
}

/**
 * Intl Cache
 * */
const intlCache = createIntlCache();

/**
 * Get Intl
 * */
export async function getIntl(locale?: string) {
  const supportedLocale = getSupportedLocale(locale);
  const messages = await getMessages(supportedLocale);

  return createIntl(
    { locale: supportedLocale, messages, onError: () => null },
    intlCache,
  );
}
