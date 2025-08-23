# Project Starter

A modern, full-stack web application starter template built on top of React Router v7 Framework Mode.

## Features

- 🛣️ Routing with [React Router](https://reactrouter.com/)
- 🔒 Authentication with [better-auth](https://github.com/better-auth)
- 🌐 Internationalization with [react-intl](https://formatjs.io/docs/react-intl/)
- 🎨 UI components with [Mantine](https://mantine.dev/)
- 📊 Charts with [@mantine/charts](https://mantine.dev/charts)
- 🔄 Data fetching with [TanStack Query](https://tanstack.com/query)
- 🚦 Type-safe API with [tRPC](https://trpc.io/)
- ✅ Validation with [Valibot](https://valibot.dev/)
- 🗄️ Database ORM with [Prisma](https://www.prisma.io/)
- � Date handling with [Day.js](https://day.js.org/)
- 🎯 ESLint with strict TypeScript and React rules

## Prerequisites

- Node.js >= 22.18.0
- [pnpm](https://pnpm.io/) >= 10.15.0
- [Docker](https://www.docker.com/) and Docker Compose

## Getting Started

1. Clone the repository

```sh
git clone https://github.com/username/project-starter.git
cd project-starter
```

2. Install dependencies

```sh
pnpm install
```

3. Set up environment variables

```sh
cp .env.example .env
```

4. Start the database and Redis with Docker Compose

```sh
pnpm run docker-compose:up
```

5. Run database migrations and seed data

```sh
pnpm run prisma:migrate:dev
pnpm run prisma:seed
```

6. Start the development server

```sh
pnpm run dev
```

The application will be available at http://localhost:5173

_NOTE_: You can change development server port in `.env` file.

## Development Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run serve` - Serve production build
- `pnpm run test` - Run tests
- `pnpm run test:watch` - Run tests in watch mode
- `pnpm run test:coverage` - Run tests with coverage
- `pnpm run lint:check` - Check code style
- `pnpm run lint:fix` - Fix code style
- `pnpm run format:check` - Check code formatting
- `pnpm run format:fix` - Fix code formatting
- `pnpm run typecheck` - Check TypeScript types

## Database Management

- `pnpm run prisma:studio` - Open Prisma Studio
- `pnpm run prisma:migrate:dev` - Create and apply migrations
- `pnpm run prisma:migrate:deploy` - Apply migrations in production
- `pnpm run prisma:seed` - Seed the database
- `pnpm run prisma:generate` - Generate Prisma Client

## Environment Variables

Environment variables are documented in `.env.example`.

## Project Structure

```
app/
  ├── context.ts         # Application context
  ├── middleware.ts      # Router middleware
  ├── root.tsx          # Root component
  ├── routes.ts         # Route definitions
  ├── core/             # Core functionality
  │   ├── ability/      # RBAC capabilities
  │   ├── auth/         # Authentication
  │   ├── env/          # Environment config
  │   ├── intl/         # Internationalization
  │   ├── prisma/       # Database client
  │   ├── react-query/  # Data fetching
  │   └── trpc/         # API client/server
  ├── domain/           # Business logic
  ├── routes/           # Route components
  └── ui/               # Shared UI components
```

## License

MIT License

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Author

Matko Bulić

---

Made with ❤️ using TypeScript and React
