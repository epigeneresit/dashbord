# Dashboard Backend

Node.js (Express + Mongoose) backend for the Maharashtra scheme monitoring platform.

## Features

- JWT authentication with Passport (RS256 keys)
- RBAC middleware with permission checks
- MongoDB models for departments, sub-departments, schemes, allocations, applications, users, roles, permissions, districts, talukas, and audit logs
- Analytics endpoints for KPIs, trends, allocation vs utilization, treemaps, and heatmaps
- Zod-powered request validation for filters and mutations
- CSV export helper for applications
- OpenAPI spec (`openapi/openapi.yaml`)

## Getting Started

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

## Testing

```bash
npm run test
```

## Code Quality

```bash
npm run lint
```

## Docker

Use the root `docker-compose.yml` to start MongoDB and the backend service together.
