import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router";
import authService from "@/service/auth.service";
import type { AuthUser, LoginDto } from "@/service/dto/auth.dto";
import {
  clearAuthSession,
  clearAuthUser,
  hasAuthSessionFlag,
  markAuthSession,
  saveAuthUser,
} from "@/utils/auth-storage";
import {
  markSessionEndedNotice,
  registerSessionExpiredHandler,
  resetSessionExpiredHandling,
} from "@/utils/sessionExpiry.utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  sessionCleared,
  sessionEstablished,
  type AuthStatus,
} from "@/store/slices/authSlice";

export type { AuthStatus };

type AuthContextValue = {
  status: AuthStatus;
  user: AuthUser | null;
  login: (payload: LoginDto) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);
  const user = useAppSelector((state) => state.auth.user);

  const becomeGuest = useCallback(
    (reason: "unauthorized" | "signed-out") => {
      if (reason === "unauthorized" && hasAuthSessionFlag()) {
        markSessionEndedNotice();
      }
      clearAuthSession();
      clearAuthUser();
      dispatch(sessionCleared());
    },
    [dispatch],
  );

  const login = useCallback(
    async (payload: LoginDto) => {
      const nextUser = await authService.login(payload);
      dispatch(sessionEstablished(nextUser));
      saveAuthUser(nextUser);
    },
    [dispatch],
  );

  const logout = useCallback(async () => {
    await authService.logout();
    becomeGuest("signed-out");
  }, [becomeGuest]);

  // The flag is tab-scoped, so a restored session has to re-raise it for a later
  // 401 to be reported as an expired session rather than a plain guest visit.
  useEffect(() => {
    if (status === "authenticated") {
      markAuthSession();
    }
  }, [status]);

  useEffect(() => {
    registerSessionExpiredHandler(() => {
      becomeGuest("unauthorized");
      navigate("/task-view", { replace: true });
      resetSessionExpiredHandling();
    });

    return () => {
      registerSessionExpiredHandler(null);
    };
  }, [becomeGuest, navigate]);

  const value = useMemo(
    () => ({ status, user, login, logout }),
    [status, user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return value;
}
