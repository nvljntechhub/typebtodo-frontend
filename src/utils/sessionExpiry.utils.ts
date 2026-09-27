import { API_ENDPOINTS } from "./api";
import { AUTH_SESSION_ENDED_NOTICE_KEY } from "./auth-storage";

const SESSION_EXEMPT_ENDPOINTS: readonly string[] = [
  API_ENDPOINTS.AUTH_LOGIN,
  API_ENDPOINTS.AUTH_REGISTER,
  API_ENDPOINTS.AUTH_LOGOUT,
  API_ENDPOINTS.AUTH_ME,
];

type SessionExpiredHandler = () => void;

let handler: SessionExpiredHandler | null = null;
let isHandling = false;
let memoryNotice = false;

function isPublicAuthUrl(url = ""): boolean {
  return SESSION_EXEMPT_ENDPOINTS.some((endpoint) => url.includes(endpoint));
}

export function shouldEndSessionForRequest(
  url: string | undefined,
  status: number,
): boolean {
  return status === 401 && !isPublicAuthUrl(url);
}

export function markSessionEndedNotice(): void {
  memoryNotice = true;
  try {
    sessionStorage.setItem(AUTH_SESSION_ENDED_NOTICE_KEY, "1");
  } catch {
    // sessionStorage is unavailable in some test / restricted environments
  }
}

export function consumeSessionEndedNotice(): boolean {
  let stored = false;
  try {
    stored = sessionStorage.getItem(AUTH_SESSION_ENDED_NOTICE_KEY) === "1";
    sessionStorage.removeItem(AUTH_SESSION_ENDED_NOTICE_KEY);
  } catch {
    // ignore
  }

  const marked = memoryNotice || stored;
  memoryNotice = false;
  return marked;
}

export function notifySessionExpired(): void {
  if (isHandling) return;
  isHandling = true;
  markSessionEndedNotice();
  handler?.();
}

export function registerSessionExpiredHandler(
  next: SessionExpiredHandler | null,
): void {
  handler = next;
  if (next && isHandling) {
    next();
  }
}

export function resetSessionExpiredHandling(): void {
  isHandling = false;
}
