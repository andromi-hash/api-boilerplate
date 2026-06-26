# API Boilerplate — Express + Prisma + JWT

**Production-ready REST API with authentication, database, validation, rate limiting, tests, and Docker.**

## Quick Start

```bash
cp .env.example .env
npm install
npx prisma db push
npm run dev
```

## Features

- **Express** — fast, unopinionated, well-documented
- **Prisma ORM** — type-safe database access (SQLite/Postgres)
- **JWT auth** — signup/login with bcrypt, middleware
- **Zod validation** — request body validation with detailed errors
- **Rate limiting** — configurable per-IP limits
- **Helmet** — security headers
- **Tests** — Node.js native test runner
- **Docker** — Dockerfile for production builds
- **CI** — GitHub Actions workflow

## API

```
GET  /api/health        → health check
POST /api/auth/signup   → create account (email, password, name?)
POST /api/auth/login    → login (email, password)
GET  /api/users/me      → get current user (auth required)
GET  /api/users         → list users (auth required)
```

## License

MIT
