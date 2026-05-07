# Jinx.to

A production-ready Next.js starter template with modern tooling, best practices, and a comprehensive set of libraries out of the box.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router and Turbopack
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with CSS variables
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives + custom components
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) + [TanStack Query](https://tanstack.com/query)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) validation
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) (dark mode support)
- **Testing**: [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) + [Playwright](https://playwright.dev/)
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **CI/CD**: GitHub Actions

## Prerequisites

- Node.js 18+
- [Bun](https://bun.sh/) (package manager)
- PostgreSQL database (for Prisma)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd jinx-to-fe
```

### 2. Install dependencies

```bash
bun install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values (see Environment Variables section below).

### 4. Set up the database

```bash
bun run db:push
bun run db:seed
```

### 5. Start the development server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable                 | Description                    | Required |
| ------------------------ | ------------------------------ | -------- |
| `NEXT_PUBLIC_APP_URL`    | Public URL of the application  | Yes      |
| `NEXT_PUBLIC_APP_NAME`   | Application name               | Yes      |
| `DATABASE_URL`           | PostgreSQL connection string   | Yes      |
| `NEXTAUTH_URL`           | NextAuth.js callback URL       | Yes      |
| `NEXTAUTH_SECRET`        | NextAuth.js secret key         | Yes      |
| `GITHUB_CLIENT_ID`       | GitHub OAuth app client ID     | No       |
| `GITHUB_CLIENT_SECRET`   | GitHub OAuth app client secret | No       |
| `GOOGLE_CLIENT_ID`       | Google OAuth client ID         | No       |
| `GOOGLE_CLIENT_SECRET`   | Google OAuth client secret     | No       |

## Available Scripts

| Script                  | Description                             |
| ----------------------- | --------------------------------------- |
| `bun run dev`           | Start development server with Turbopack |
| `bun run build`         | Build for production                    |
| `bun run start`         | Start production server                 |
| `bun run lint`          | Run ESLint                              |
| `bun run lint:fix`      | Run ESLint with auto-fix                |
| `bun run format`        | Format code with Prettier               |
| `bun run format:check`  | Check code formatting                   |
| `bun run type-check`    | Run TypeScript type checking            |
| `bun run test`          | Run unit tests with Vitest              |
| `bun run test:ui`       | Run tests with Vitest UI                |
| `bun run test:coverage` | Run tests with coverage report          |
| `bun run test:e2e`      | Run Playwright E2E tests                |
| `bun run analyze`       | Analyze bundle size                     |
| `bun run db:generate`   | Generate Prisma client                  |
| `bun run db:migrate`    | Run database migrations                 |
| `bun run db:push`       | Push schema to database                 |
| `bun run db:studio`     | Open Prisma Studio                      |
| `bun run db:seed`       | Seed the database                       |

## Project Structure

```
jinx-to-fe/
├── .github/
│   └── workflows/         # GitHub Actions CI/CD
├── .husky/                # Git hooks
├── .vscode/               # VS Code settings
├── actions/               # Next.js server actions
├── app/                   # Next.js App Router
│   ├── (dashboard)/       # Dashboard route group
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── loading.tsx        # Loading UI
│   ├── error.tsx          # Error UI
│   └── not-found.tsx      # 404 page
├── components/
│   ├── forms/             # Form components
│   ├── layouts/           # Layout components
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and configurations
├── prisma/                # Database schema and seeds
├── public/                # Static assets
├── styles/                # Additional styles
├── tests/
│   ├── e2e/               # Playwright E2E tests
│   └── unit/              # Vitest unit tests
└── types/                 # TypeScript type definitions
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. Deploy

### Manual

```bash
bun run build
bun run start
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request

Please ensure:

- All tests pass (`bun run test`)
- Code is properly formatted (`bun run format:check`)
- TypeScript compiles without errors (`bun run type-check`)
- ESLint passes (`bun run lint`)
