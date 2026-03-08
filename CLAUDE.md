# CLAUDE.md — GymBro Project Guide

This file provides context and conventions for AI assistants (Claude Code and similar) working on this repository.

---

## Project Status

**This repository is currently empty and awaiting initial development.**

- No source files exist yet
- No framework, language, or toolchain has been committed
- This CLAUDE.md will be updated as the project takes shape

---

## Project Overview

**Repository:** `zadremal/gymbro`
**Purpose:** A fitness/gym companion application ("GymBro")

The intended scope, features, and architecture should be defined before beginning implementation. Once established, update this file with:

- Application description and goals
- Target users and core use cases
- Tech stack choices and rationale

---

## Repository Structure

_To be filled in once the project structure is established._

Example structure to aim for (update when real structure is created):

```
gymbro/
├── CLAUDE.md             # This file
├── README.md             # User-facing documentation
├── .env.example          # Required environment variables
├── package.json          # (if Node.js)
├── src/
│   ├── index.ts          # Entry point
│   ├── routes/           # API route handlers
│   ├── models/           # Data models / DB schemas
│   ├── services/         # Business logic
│   └── middleware/       # Auth, validation, etc.
├── tests/                # Test files mirroring src/ structure
└── migrations/           # Database migration files
```

---

## Tech Stack

_To be confirmed. Update this section after initial setup._

Candidates to evaluate:
- **Runtime:** Node.js (TypeScript) or Python
- **Framework:** Express / Fastify / NestJS / FastAPI
- **Database:** PostgreSQL / SQLite / MongoDB
- **ORM:** Prisma / Drizzle / SQLAlchemy
- **Auth:** JWT / session-based / OAuth
- **Testing:** Jest / Vitest / pytest
- **Linter/Formatter:** ESLint + Prettier / Ruff

---

## Development Workflow

### Getting Started

```bash
# Clone and install
git clone <repo-url>
cd gymbro

# Install dependencies (update command for chosen stack)
npm install        # Node.js
# or
pip install -r requirements.txt  # Python

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
# or
python -m uvicorn main:app --reload
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

When working on this codebase, AI assistants should:

### General

- **Read before editing** — always read existing files before modifying them
- **Minimal changes** — only change what is necessary; do not refactor unrelated code
- **No unnecessary files** — do not create files that are not needed for the task
- **No speculative features** — implement only what is explicitly requested
- **Secure by default** — validate all user input, avoid SQL injection, XSS, etc.

### Code Style

- Follow the conventions already present in the codebase
- Match existing indentation (spaces vs. tabs), quote style, and naming conventions
- Do not add comments to code that is self-explanatory
- Do not add type annotations to code that was not already typed (unless the task is adding types)

### Database

- Never run destructive migrations without explicit confirmation
- Always generate migration files rather than mutating the schema directly
- Check for existing patterns in migration files before writing new ones

### Testing

- Write tests for new features when tests already exist in the project
- Place test files adjacent to source files or in a mirrored `tests/` directory
- Do not skip or mock tests to make them pass — fix the underlying issue

### Environment & Secrets

- Never hardcode secrets, API keys, or credentials
- Use environment variables for all configuration
- Add new variables to `.env.example` (without values) when introducing them

### Git

- Commit on the designated `claude/<task-id>` branch
- Push with: `git push -u origin <branch-name>`
- Write descriptive commit messages explaining *why*, not just *what*

---

## Environment Variables

_To be defined. Update this section as variables are introduced._

```bash
# .env.example (template — copy to .env and fill in values)
NODE_ENV=development
PORT=3000
DATABASE_URL=
JWT_SECRET=
```

---

## API Conventions

_To be defined once routes are established. Update with:_

- Base URL structure (e.g., `/api/v1/...`)
- Authentication header format
- Request/response JSON conventions
- Error response shape
- Pagination approach

---

## Testing

_To be defined. Update with:_

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run a specific file
npm test -- src/services/workout.test.ts
```

---

## Deployment

_To be defined. Update with deployment target, CI/CD setup, and production checklist._

---

## Updating This File

Whenever a significant architectural decision is made, update the relevant section in this file. Specifically:

- After choosing the tech stack → update **Tech Stack**
- After creating the project structure → update **Repository Structure**
- After adding environment variables → update **Environment Variables**
- After defining API patterns → update **API Conventions**
- After configuring tests → update **Testing**

Keep this file accurate and current — it is the primary reference for AI assistants working on this project.
