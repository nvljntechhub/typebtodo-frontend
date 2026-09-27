import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink } from "react-router";
import { Button } from "@mui/material";
import {
  SignInContainer,
  Card,
  SignInTitle,
  SignInLede,
  SignInForm,
  CenteredLink,
} from "@/components/styled/auth";
import TextInput from "@/components/Inputs/TextInput";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/utils/form-handling/validation-schema";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = () => {
    setSent(true);
  };

  return (
    <SignInContainer direction="column">
      <Card variant="outlined">
        <SignInTitle component="h1" variant="h4">
          Reset password
        </SignInTitle>
        <SignInLede>
          {sent
            ? "A reset link is on its way to that email."
            : "Enter your account's email address, and we'll send you a link to reset your password."}
        </SignInLede>
        {sent ? (
          <CenteredLink component={RouterLink} to="/login" variant="body2">
            Back to sign in
          </CenteredLink>
        ) : (
          <SignInForm onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextInput
              label="Email"
              placeholder="you@studio.com"
              type="email"
              required
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />
            <Button type="submit" fullWidth variant="contained">
              Continue
            </Button>
            <CenteredLink component={RouterLink} to="/login" variant="body2">
              Back to sign in
            </CenteredLink>
          </SignInForm>
        )}
      </Card>
    </SignInContainer>
  );
}
