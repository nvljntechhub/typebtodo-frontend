import type { AuthUser } from "@/service/dto/auth.dto";

const AUTH_USER_STORAGE_KEY = "todo_auth_user";
/** Marks an active cookie-based session (HttpOnly tokens are not readable from JS) */
const AUTH_SESSION_FLAG_KEY = "todo_auth_session";
/** Shown once on the login screen after an expired session is cleared */
export const AUTH_SESSION_ENDED_NOTICE_KEY = "todo_session_ended";

export function markAuthSession(): void {
  try {
    sessionStorage.setItem(AUTH_SESSION_FLAG_KEY, "1");
  } catch {
    // sessionStorage is unavailable in some test / restricted environments
  }
}

export function clearAuthSession(): void {
  try {
    sessionStorage.removeItem(AUTH_SESSION_FLAG_KEY);
  } catch {
    // ignore
  }
}

export function hasAuthSessionFlag(): boolean {
  try {
    return sessionStorage.getItem(AUTH_SESSION_FLAG_KEY) === "1";
  } catch {
    return false;
  }
}

export function saveAuthUser(user: AuthUser): void {
  try {
    localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
  } catch {
    // localStorage is unavailable in some test / restricted environments
  }
}

export function loadAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const stored: unknown = JSON.parse(raw);
    if (typeof stored !== "object" || stored === null) {
      return null;
    }

    const { id, email, name } = stored as Partial<AuthUser>;
    if (
      typeof id !== "string" ||
      typeof email !== "string" ||
      typeof name !== "string"
    ) {
      return null;
    }

    return { id, email, name };
  } catch {
    return null;
  }
}

export function clearAuthUser(): void {
  try {
    localStorage.removeItem(AUTH_USER_STORAGE_KEY);
  } catch {
    // ignore
  }
}
