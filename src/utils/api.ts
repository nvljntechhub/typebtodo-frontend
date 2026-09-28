export const API_ENDPOINTS = {
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
