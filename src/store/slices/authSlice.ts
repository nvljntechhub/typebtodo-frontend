import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "@/service/dto/auth.dto";
import { loadAuthUser } from "@/utils/auth-storage";

export type AuthStatus = "authenticated" | "guest";

type AuthState = {
  user: AuthUser | null;
  status: AuthStatus;
};

const persistedUser = loadAuthUser();

const initialState: AuthState = {
  user: persistedUser,
  status: persistedUser ? "authenticated" : "guest",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sessionEstablished(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      state.status = "authenticated";
    },
    sessionCleared(state) {
      state.user = null;
      state.status = "guest";
    },
  },
});

export const { sessionEstablished, sessionCleared } = authSlice.actions;
export default authSlice.reducer;
