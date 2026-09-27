import api, { Method } from "@/utils/api-manager.utils";
import type { AuthUser, LoginDto, RegisterDto } from "./dto/auth.dto";
import { API_ENDPOINTS } from "@/utils/api";
import { ApiError } from "@/utils/error-handler.utils";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readAuthUser(payload: unknown): AuthUser {
  const data = isRecord(payload) ? payload.data : undefined;
  const user = isRecord(data) ? data.user : undefined;

  if (
    !isRecord(user) ||
    typeof user.id !== "string" ||
    typeof user.email !== "string" ||
    typeof user.name !== "string"
  ) {
    throw new ApiError({
      statusCode: 0,
      message: "Unexpected response from the server.",
    });
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

const authService = {
  login: async (payload: LoginDto) => {
    const response = await api(
      Method.POST,
      null,
      API_ENDPOINTS.AUTH_LOGIN,
      payload,
    );
    return readAuthUser(response);
  },
  register: async (payload: RegisterDto) => {
    const response = await api(
      Method.POST,
      null,
      API_ENDPOINTS.AUTH_REGISTER,
      payload,
    );
    return response;
  },
  logout: async () => {
    await api(Method.POST, null, API_ENDPOINTS.AUTH_LOGOUT);
  },
};

export default authService;
