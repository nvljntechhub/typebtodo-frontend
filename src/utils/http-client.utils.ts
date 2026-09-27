import axios from "axios";
import {
  notifySessionExpired,
  shouldEndSessionForRequest,
} from "./sessionExpiry.utils";
import { BACKEND_URL } from "./properties";

/** Shared client — sends HttpOnly auth cookies on cross-origin requests when configured */
export const httpClient = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

// Let the browser set multipart boundary when sending FormData.
httpClient.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    if (typeof config.headers?.set === "function") {
      config.headers.set("Content-Type", undefined);
    } else if (config.headers) {
      delete (config.headers as Record<string, unknown>)["Content-Type"];
      delete (config.headers as Record<string, unknown>)["content-type"];
    }
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (
        typeof status === "number" &&
        shouldEndSessionForRequest(error.config?.url, status)
      ) {
        notifySessionExpired();
      }
    }
    return Promise.reject(error);
  },
);
