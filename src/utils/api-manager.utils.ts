import type { AxiosRequestConfig } from "axios";
import { httpClient } from "./http-client.utils";
import { API_ENDPOINTS } from "./api";
import { parseApiError } from "./error-handler.utils";

export const Method = {
  POST: "post",
  GET: "get",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
} as const;

type HttpMethod = (typeof Method)[keyof typeof Method];

export type ApiResponse<T = undefined> = {
  statusCode: number;
  message: string;
  data: T;
};

const INVALID_TOKEN = "INVALID_TOKEN";

export default async function api<T = unknown>(
  method: HttpMethod,
  headers: Record<string, string> | null,
  endpoint: string,
  body?: unknown,
  params?: Record<string, unknown>,
): Promise<T> {
  const config: AxiosRequestConfig = {
    method,
    url: API_ENDPOINTS.VERSION + endpoint,
    data: body ?? undefined,
    params,
    headers: {
      ...(headers ?? {}),
    },
  };

  try {
    const response = await httpClient.request<T>(config);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error && error.message === INVALID_TOKEN) {
      throw error;
    }
    throw parseApiError(error);
  }
}
