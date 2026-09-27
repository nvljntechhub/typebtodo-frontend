export const API_ENDPOINTS = {
  BACKEND_URL: "http://localhost:5001",
  VERSION: "/api/v1",
  AUTH_LOGIN: "/auth/login",
  AUTH_LOGOUT: "/auth/logout",
  AUTH_REGISTER: "/auth/register",
  AUTH_ME: "/auth/me",
  TODOS: "/todos",
} as const;

export const todoEndpoint = (id: string) => `${API_ENDPOINTS.TODOS}/${id}`;

export const todoDoneEndpoint = (id: string) =>
  `${API_ENDPOINTS.TODOS}/${id}/done`;
