# CLAUDE.md — GymBro Project Guide

This file provides context and conventions for AI assistants (Claude Code and similar) working on this repository.

---

## Project Status

**Tech stack selected. Implementation not yet started.**

- Stack decisions are finalized (see Tech Stack section)
- No source files exist yet
- Update this file as structure and conventions are established

---

## Project Overview

**Repository:** `zadremal/gymbro`
**Purpose:** A full-stack fitness/gym companion application ("GymBro")
**App type:** Full-stack (Next.js frontend + Express API backend, monorepo)

---

## Tech Stack

| Layer | Choice |
|---|---|
| **Runtime** | Node.js with TypeScript |
| **Package Manager** | Bun |
| **Frontend** | Next.js (React, SSR/SSG) |
| **Backend** | Express.js |
| **Database** | PostgreSQL |
| **ORM** | Drizzle ORM |
| **Auth** | JWT — stateless access + refresh tokens |
| **Schema / Validation** | Zod + zod-to-openapi (shared frontend + backend) |
| **API Contract** | OpenAPI 3.1 spec generated from Zod schemas |
| **Frontend API Client** | openapi-fetch (type-safe, generated from spec) |
| **Testing** | Vitest |
| **Linter/Formatter** | ESLint + Prettier |
| **Deployment** | Vercel (frontend + API via serverless functions) |

---

## Repository Structure

Monorepo using Bun workspaces. Frontend follows **Atomic Design**. Shared schemas are the source of truth for OpenAPI + validation.

```
gymbro/
├── CLAUDE.md                       # This file
├── README.md                       # User-facing documentation
├── .env.example                    # Required environment variables
├── package.json                    # Root (Bun workspaces)
├── bun.lockb                       # Bun lockfile (commit this)
├── vercel.json                     # Vercel monorepo routing config
│
├── packages/
│   └── schemas/                    # Zod schemas — single source of truth
│       ├── src/
│       │   ├── auth.schema.ts      # Auth request/response schemas
│       │   ├── workout.schema.ts   # Workout schemas
│       │   ├── user.schema.ts      # User schemas
│       │   └── index.ts            # Re-exports all schemas
│       └── openapi.ts              # Generated OpenAPI spec (via zod-to-openapi)
│
├── apps/
│   ├── web/                        # Next.js frontend
│   │   ├── app/                    # App Router — pages and layouts only
│   │   ├── components/
│   │   │   ├── atoms/              # Smallest units: Button, Input, Label, Badge, Avatar
│   │   │   ├── molecules/          # Composed atoms: FormField, SearchBar, StatCard
│   │   │   ├── organisms/          # Complex sections: Navbar, WorkoutForm, ExerciseList
│   │   │   ├── templates/          # Page layouts: DashboardTemplate, AuthTemplate
│   │   │   └── providers/          # React context providers
│   │   └── lib/
│   │       ├── api-client.ts       # Type-safe fetch client (openapi-fetch)
│   │       └── utils.ts
│   │
│   └── api/                        # Express backend
│       ├── src/
│       │   ├── index.ts            # Entry point
│       │   ├── routes/             # Route handlers (one file per resource)
│       │   ├── middleware/
│       │   │   ├── auth.ts         # JWT verification
│       │   │   └── validate.ts     # Zod request validation middleware
│       │   ├── services/           # Business logic
│       │   └── db/                 # Drizzle schema and client
│       └── drizzle/                # Migration files
```

### Atomic Design Rules

| Level | Contents | Examples |
|---|---|---|
| **atoms** | Single-purpose, no business logic | `Button`, `Input`, `Label`, `Badge`, `Spinner` |
| **molecules** | 2–5 atoms combined, one responsibility | `FormField`, `SearchBar`, `WorkoutStatCard` |
| **organisms** | Feature-level sections, may fetch data | `Navbar`, `WorkoutForm`, `ExerciseTable` |
| **templates** | Layout shells, no data | `DashboardTemplate`, `AuthTemplate` |
| **app/** | Next.js pages — wire templates + organisms | `app/dashboard/page.tsx` |

- Atoms and molecules must be purely presentational (no API calls, no direct store access)
- Organisms may be connected to state/data
- Templates define layout only — no business logic, no hardcoded content

---

## Development Workflow

### Getting Started

```bash
# Clone and install (Bun required: https://bun.sh)
git clone <repo-url>
cd gymbro
bun install

# Copy environment variables
cp .env.example .env
# Fill in DATABASE_URL and JWT_SECRET in .env

# Run database migrations
bun run db:migrate

# Start development servers (frontend + backend)
bun run dev
```

### Branch Strategy

- `main` — stable, production-ready code
- `claude/<task-id>` — AI-assisted development branches (auto-created per task)
- Feature branches: `feat/<short-description>`
- Bug fix branches: `fix/<short-description>`

### Commits

Use conventional commit format:

```
type(scope): short description

Types: feat, fix, refactor, test, docs, chore, style
```

Examples:
```
feat(auth): add JWT login endpoint
fix(workouts): correct set count calculation
test(users): add unit tests for profile update
docs: update CLAUDE.md with API conventions
```

---

## AI Assistant Instructions

### General

- **Read before editing** — always read existing files before modifying them
- **Minimal changes** — only change what is necessary; do not refactor unrelated code
- **No unnecessary files** — do not create files that are not needed for the task
- **No speculative features** — implement only what is explicitly requested
- **Secure by default** — validate all user input, avoid SQL injection, XSS, etc.

### Code Style

- TypeScript everywhere — no plain `.js` files in `src/`
- 2-space indentation, single quotes, trailing commas (Prettier defaults)
- Named exports preferred over default exports (except Next.js pages/layouts)
- Do not add comments to self-explanatory code

### Schemas & Validation

- All request/response shapes must have a Zod schema in `packages/schemas`
- Never define inline types for API data — always derive with `z.infer<typeof Schema>`
- Never skip validation on the backend — every route handler must use the `validate` middleware
- Never skip validation on the frontend — form submissions and API responses must be parsed with Zod
- After adding a schema, regenerate the OpenAPI spec: `bun run openapi:generate`
- Do not hand-edit `openapi.ts` — it is generated output

### Atomic Design

- Place new components in the correct atomic level — see the table in Repository Structure
- Atoms and molecules must be purely presentational (no API calls, no store access)
- Organisms may connect to data/state
- New pages in `app/` should compose a template + organisms, not contain UI markup directly

### Database (Drizzle)

- Define schema in `apps/api/src/db/schema.ts`
- Generate migrations with `bun run db:generate` — never hand-edit generated files
- Never run destructive migrations without explicit confirmation
- Always check existing schema patterns before adding new tables/columns

### Auth (JWT)

- Access tokens: short-lived (15 min), sent in `Authorization: Bearer <token>` header
- Refresh tokens: long-lived (7 days), stored in httpOnly cookies
- Never log or expose token values
- Protect routes with the auth middleware in `apps/api/src/middleware/auth.ts`

### Testing (Vitest)

- Write tests for new features when tests already exist in the project
- Place test files adjacent to source: `foo.ts` → `foo.test.ts`
- Do not skip or mock tests to make them pass — fix the underlying issue
- Run tests with `bun test`

### Package Management (Bun)

- Always use `bun` — never `npm`, `yarn`, or `pnpm`
- Add a dependency: `bun add <package>` / `bun add -d <package>` for dev deps
- Run scripts: `bun run <script>`
- Commit `bun.lockb` — it is a binary lockfile and must be version-controlled
- Do not commit `node_modules/`

### Environment & Secrets

- Never hardcode secrets, API keys, or credentials
- Use environment variables for all configuration
- Add new variables to `.env.example` (without values) when introducing them
- On Vercel, set all production env vars via the Vercel dashboard (not committed files)

### Git

- Commit on the designated `claude/<task-id>` branch
- Push with: `git push -u origin <branch-name>`
- Write descriptive commit messages explaining *why*, not just *what*

---

## Environment Variables

```bash
# .env.example (copy to .env and fill in values)
NODE_ENV=development
PORT=3000
DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
```

---

## API Conventions

### Overview

- Base URL: `/api/v1/...`
- Auth header: `Authorization: Bearer <access_token>`
- All responses use a consistent envelope (see below)
- Validation runs on **both ends** from the same Zod schemas in `packages/schemas`

### Schema-First Workflow

Zod schemas in `packages/schemas` are the single source of truth:

```
Zod schema (packages/schemas)
  ├── Backend: validate requests via middleware (zod.parse)
  ├── Frontend: validate forms + API responses (zod.parse / zod.safeParse)
  └── OpenAPI spec: generated via zod-to-openapi → consumed by openapi-fetch
```

1. **Define** the schema in `packages/schemas/src/<resource>.schema.ts`
2. **Register** it in `openapi.ts` to update the generated spec
3. **Backend** — use the `validate` middleware to parse `req.body` / `req.query`
4. **Frontend** — use `openapi-fetch` client for type-safe calls; validate forms with the same schema

### Schema Example

```ts
// packages/schemas/src/workout.schema.ts
import { z } from 'zod'
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

extendZodWithOpenApi(z)

export const CreateWorkoutSchema = z.object({
  name: z.string().min(1).max(100).openapi({ example: 'Leg Day' }),
  notes: z.string().max(500).optional(),
}).openapi('CreateWorkout')

export type CreateWorkout = z.infer<typeof CreateWorkoutSchema>
```

### Response Envelope

```ts
// Success
{ "data": { ... }, "meta": { "cursor": "..." } }

// Error
{ "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [...] } }
```

### Validation Middleware (Backend)

```ts
// Automatically returns 400 with structured error if schema fails
router.post('/workouts', validate({ body: CreateWorkoutSchema }), handler)
```

### Frontend API Client

```ts
// lib/api-client.ts — generated types from OpenAPI spec
import createClient from 'openapi-fetch'
import type { paths } from '@gymbro/schemas/openapi'

export const api = createClient<paths>({ baseUrl: '/api/v1' })
```

### Pagination

Cursor-based: `GET /api/v1/workouts?cursor=<id>&limit=20`

---

## Testing

```bash
# Run all tests
bun test

# Run with coverage
bun run test:coverage

# Run tests for a specific workspace
bun test --cwd apps/api
```

---

## Deployment

**Target:** Vercel

### Architecture on Vercel

- `apps/web` (Next.js) — deployed as a standard Vercel project with automatic SSR/SSG support
- `apps/api` (Express) — deployed as Vercel Serverless Functions via an `api/` directory or adapter
- Both are configured through `vercel.json` at the repo root for monorepo routing

### vercel.json (root)

```json
{
  "buildCommand": "bun run build",
  "installCommand": "bun install",
  "framework": null,
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/apps/api/src/index.ts" }
  ]
}
```

### Environment Variables on Vercel

Set these in the Vercel dashboard under **Project → Settings → Environment Variables**:

| Variable | Environments |
|---|---|
| `DATABASE_URL` | Production, Preview |
| `JWT_SECRET` | Production, Preview |
| `JWT_REFRESH_SECRET` | Production, Preview |
| `NODE_ENV` | Production → `production` |

Never commit production secrets to the repo.

### Deploying

```bash
# Install Vercel CLI (once)
bun add -g vercel

# Link project (once)
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### CI/CD

Vercel auto-deploys on push:
- Push to `main` → production deployment
- Push to any other branch → preview deployment (unique URL per branch)

No additional CI configuration is required for basic deployments.

---

## Updating This File

Whenever a significant architectural decision is made, update the relevant section:

- After creating the project structure → update **Repository Structure**
- After adding environment variables → update **Environment Variables**
- After defining API patterns → update **API Conventions**
- After configuring tests → update **Testing**
- After choosing deployment target → update **Deployment**

Keep this file accurate and current — it is the primary reference for AI assistants working on this project.
