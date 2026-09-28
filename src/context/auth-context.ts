import { createContext, useContext } from "react";
import type { AuthUser, LoginDto } from "@/service/dto/auth.dto";
import type { AuthStatus } from "@/store/slices/authSlice";

export type AuthContextValue = {
  status: AuthStatus;
  user: AuthUser | null;
  login: (payload: LoginDto) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return value;
}
