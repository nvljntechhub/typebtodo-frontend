import { z } from "zod";
import { help } from "../properties";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().nonempty("Password " + help.VALUE_REQUIRED),
});
export type LoginFormData = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const registerSchema = z
  .object({
    name: z.string().trim().nonempty("Name " + help.VALUE_REQUIRED),
    email: z.email("Invalid email address"),
    password: z.string().nonempty("Password " + help.VALUE_REQUIRED),
    confirmPassword: z
      .string()
      .nonempty("Confirm password " + help.VALUE_REQUIRED),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: help.PASSWORD_MATCH_ERROR,
    path: ["confirmPassword"],
  });
export type RegisterFormData = z.infer<typeof registerSchema>;
