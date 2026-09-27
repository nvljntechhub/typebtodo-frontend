import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter the email you use for Typeb.")
    .pipe(
      z.email("That email doesn't look complete. Check it and try again."),
    ),
  password: z.string().min(1, "Enter your password to continue."),
  remember: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
