import axios from "axios";

type ApiErrorBody = {
  statusCode: number;
  message: string;
  path?: string;
  timestamp?: string;
};

export class ApiError extends Error {
  statusCode: number;
  path?: string;
  timestamp?: string;

  constructor(body: ApiErrorBody) {
    super(body.message);
    this.name = "ApiError";
    this.statusCode = body.statusCode;
    this.path = body.path;
    this.timestamp = body.timestamp;
  }
}

const FALLBACK_MESSAGE = "Something went wrong. Try again.";
const NETWORK_MESSAGE =
  "Unable to reach the server. Check your connection and try again.";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeMessage(message: unknown): string | null {
  if (typeof message === "string" && message.trim()) {
    return message.trim();
  }

  if (Array.isArray(message)) {
    const parts = message.filter(
      (item): item is string => typeof item === "string" && item.trim().length > 0,
    );
    if (parts.length > 0) {
      return parts.join(". ");
    }
  }

  return null;
}

function readBody(
  value: unknown,
  fallbackStatus?: number,
): ApiErrorBody | null {
  if (!isRecord(value)) {
    return null;
  }

  const message = normalizeMessage(value.message);
  if (!message) {
    return null;
  }

  const statusCode =
    typeof value.statusCode === "number" ? value.statusCode : fallbackStatus;
  if (typeof statusCode !== "number") {
    return null;
  }

  return {
    statusCode,
    message,
    path: typeof value.path === "string" ? value.path : undefined,
    timestamp: typeof value.timestamp === "string" ? value.timestamp : undefined,
  };
}

export function parseApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const fromBody = readBody(error.response?.data, error.response?.status);
    if (fromBody) {
      return new ApiError(fromBody);
    }

    if (!error.response) {
      return new ApiError({ statusCode: 0, message: NETWORK_MESSAGE });
    }

    return new ApiError({
      statusCode: error.response.status,
      message: FALLBACK_MESSAGE,
    });
  }

  if (isRecord(error) && "data" in error) {
    const status = typeof error.status === "number" ? error.status : undefined;
    const fromBody = readBody(error.data, status);
    if (fromBody) {
      return new ApiError(fromBody);
    }
  }

  const direct = readBody(error);
  if (direct) {
    return new ApiError(direct);
  }

  if (error instanceof Error && error.message.trim()) {
    return new ApiError({ statusCode: 0, message: error.message });
  }

  return new ApiError({ statusCode: 0, message: FALLBACK_MESSAGE });
}

export function handleApiError(error: unknown): string {
  return parseApiError(error).message;
}
