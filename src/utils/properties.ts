export const help = {
  VALUE_REQUIRED: "cannot be blank",
  PASSWORD_MATCH_ERROR: "Passwords do not match",
};

export const successMessages = {
  ACCOUNT_CREATED: "Account created successfully",
  LOGIN_SUCCESS: "Login successful",
  TASK_CREATED: "Task created successfully",
};

export const BACKEND_URL: string =
  import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5001";
