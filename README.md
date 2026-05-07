# jinx-fe

Customer-facing storefront for jinx.to. Next.js 16 (App Router, SSR) with
React Query, Zustand, Tailwind v4, and socket.io for real-time updates.

## Stack

- **Framework**: Next.js 16, React 19, App Router, SSR + Server Actions
- **State**: TanStack Query 5, Zustand
- **Forms**: React Hook Form + Zod
- **Styling**: Tailwind v4
- **Icons**: `@central-icons-react/all` (requires `CENTRAL_LICENSE_KEY` at install time)
- **Realtime**: socket.io-client → backend WebSocket gateway

## Package manager

This project uses **npm**. Don't run `yarn install` — there's a
`package-lock.json` and the Docker image installs with `npm ci`.

If you see `yarn.lock` in the repo, delete it. The `Dockerfile` checks
`package-lock.json` before falling back to yarn, but mixed lockfiles cause
"frozen-lockfile" build failures.

## Local development

```bash
npm install
cp .env.example .env.local        # if .env.example exists; otherwise see below
npm run dev                       # http://localhost:3000
```

Environment:

| Variable                 | Example                    | Notes                        |
| ------------------------ | -------------------------- | ---------------------------- |
| `NEXT_PUBLIC_APP_URL`    | `http://localhost:3000`    | this app's own URL           |
| `NEXT_PUBLIC_API_URL`    | `http://localhost:3001/v1` | backend base + version       |
| `NEXT_PUBLIC_WS_URL`     | `http://localhost:3001`    | WebSocket origin             |
| `NEXT_PUBLIC_SENTRY_DSN` | (optional)                 | client error tracking        |
| `NEXT_PUBLIC_GA_ID`      | (optional)                 | analytics                    |
| `CENTRAL_LICENSE_KEY`    | (required)                 | needed at `npm install` time |

`NEXT_PUBLIC_*` values are baked into the bundle at **build time**, not read
at runtime. Rebuilding is mandatory after changing any of them.

## Scripts

| Script               | Purpose                                                |
| -------------------- | ------------------------------------------------------ |
| `npm run dev`        | Turbopack dev server on `:3000`                        |
| `npm run build`      | `next build` — produces standalone output              |
| `npm run start`      | Run the standalone server (used by the prod container) |
| `npm run type-check` | `tsc --noEmit`                                         |
| `npm run lint`       | ESLint                                                 |
| `npm run analyze`    | Bundle analyzer (`ANALYZE=true next build`)            |

## Production build

`next.config.ts` sets `output: 'standalone'`. The Docker runner stage copies
`/.next/standalone`, `/.next/static`, and `/public`, then runs `node server.js`.
Final image is ~150 MB.

The build needs three things in the environment:

1. All `NEXT_PUBLIC_*` keys consumed by the bundle
2. `CENTRAL_LICENSE_KEY` (set as `ARG` in the Dockerfile, exposed before
   `npm ci` so the `@central-icons-react` postinstall license check passes)
3. Internet access to npm registry

## Production deployment

Lives in the sibling [`deploy`](../deploy/) repo. Build args for this service
are passed in `docker-compose.yml` under `services.fe.build.args`. To rebuild
with a fresh license key (or any other build-time change):

```bash
cd /opt/jinx/deploy
docker compose build --no-cache fe
docker compose up -d fe
```

## Routing

The App Router uses route groups for clean URL structure without affecting
the URL itself:

- `app/(landing)/` — public marketing pages
- `app/(auth)/` — login, signup, OTP flows
- `app/(dashboard)/` — authenticated user area
- `app/(checkout)/` — checkout funnel

`actions/` holds Server Actions that proxy to the backend via axios; auth
tokens are stored in cookies and refreshed automatically by the interceptor
in `lib/api.ts`.
