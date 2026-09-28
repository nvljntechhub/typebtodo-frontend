const AUTH_PATHS = ["/login", "/register", "/forgot-password"];

export function readRedirectPath(state: unknown): string | null {
  if (typeof state !== "object" || state === null || !("from" in state)) {
    return null;
  }

  const from = (state as { from: unknown }).from;
  if (typeof from !== "string" || !from.startsWith("/") || from.startsWith("//")) {
    return null;
  }

  const path = from.split("?")[0]?.split("#")[0] ?? from;
  if (AUTH_PATHS.includes(path)) {
    return null;
  }

  return from;
}
