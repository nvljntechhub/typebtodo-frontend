# TODO Frontend

React + TypeScript + Vite client for the TODO app. Uses MUI (styled-components
engine), Redux Toolkit for auth state, React Hook Form + Zod for forms, and
Axios with cookie-based sessions.

## Prerequisites

- Node.js `^20.19.0` or `>=22.12.0` (required by Vite 8)
- npm
- The [TODO backend](../TODO-backend) running locally (NestJS API on port `5001`)

## Setup

```bash
npm install
```

The app reads the API base URL from `VITE_BACKEND_URL`. Vite only exposes
variables prefixed with `VITE_`.

Create or update `.env.development`:

```bash
VITE_BACKEND_URL=http://localhost:5001
```

If the variable is omitted, the client falls back to `http://localhost:5001`
(see `src/utils/properties.ts`).

Restart the Vite server after changing env files.

## Run

Start the backend first (from `TODO-backend`):

```bash
npm install
cp .env.development .env.development.local
docker compose up -d
npm run migration:run
npm run start:dev
```

Then start this app:

```bash
npm run dev
```

Vite serves the UI at [http://localhost:5173](http://localhost:5173).

Cookie auth uses `withCredentials`, so the backend CORS origin must include
the Vite URL (`http://localhost:5173`). The backend `FRONTEND_URL` setting
covers this; in development it also allows localhost origins.

## Using the app

| Path | Access | Description |
| --- | --- | --- |
| `/login` | guest | Sign in |
| `/register` | guest | Create an account |
| `/task-view` | signed in | Create, edit, complete, and delete todos |
| `/status/404` | public | Not found |
| `/status/500` | public | Server error |

Register an account, then sign in. Auth cookies are set by the backend and
sent automatically on later API calls (`/api/v1/...`).

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check and build for production
- `npm run preview` — serve the production build
- `npm run lint` — run ESLint

## Layout

```
src/
  components/   shared inputs, loaders, styled primitives
  context/      AuthProvider
  hooks/        snackbar helper
  layout/       BaseLayout
  pages/        auth, task-view, status pages
  routes/       route tables and auth/guest guards
  service/      API services and DTOs
  store/        Redux store and auth slice
  theme/        MUI theme setup
  utils/        http client, error handling, validation schemas
```
