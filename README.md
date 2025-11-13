# Maharashtra Scheme Dashboard

A full-stack platform to track departments, schemes, allocations, and beneficiary applications for Maharashtra state schemes.

## Structure

- `backend/` – Express + Mongoose API with RBAC, analytics, exports, and OpenAPI documentation.
- `frontend/` – React 18 application (Vite) with Tailwind CSS, shadcn/ui components, TanStack Table, and React Query.
- `docker-compose.yml` – Local orchestration for the API and MongoDB.

## Quick Start

```bash
npm install
npm run backend
npm run frontend
```

> **Troubleshooting:** The project depends on public npm packages for both the
> API and frontend workspaces. In environments without outbound npm registry
> access these installation and start commands will fail with `npm ERR! 403`
> errors. Ensure the registry is reachable or mirror the required packages
> before attempting to run the services.

See `backend/README.md` and `frontend/README.md` for detailed instructions.
