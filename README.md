# TODO Frontend

React + TypeScript + Vite frontend for the TODO app. Uses MUI (with the
styled-components engine), Redux Toolkit for auth state, React Hook Form + Zod
for forms, and Axios for API calls.

## Getting started

```bash
npm install
npm run dev
```

The app expects the backend at the `BACKEND_URL` defined in
`src/utils/api.ts` (default `http://localhost:5001`).

## Scripts

- `npm run dev` — start the dev server
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
