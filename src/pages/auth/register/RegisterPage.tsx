import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router";

import {
  SignInContainer,
  Card,
  SignInTitle,
  SignInLede,
  SignInForm,
  CenteredLink,
  SocialAuthBox,
  SignUpText,
} from "@/components/styled/auth";
import TextInput from "@/components/Inputs/TextInput";
import PasswordField from "@/components/Inputs/PasswordField";
import { Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormData,
} from "@/utils/form-handling/validation-schema";
import authService from "@/service/auth.service";
import { handleApiError } from "@/utils/error-handler.utils";
import { useState } from "react";
import FormAlert from "@/components/ui/Alert";
import { useSnackbarAlert } from "@/hooks/useSnackbar";
import { successMessages } from "@/utils/properties";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });
  const { showSuccess } = useSnackbarAlert();
  const navigate = useNavigate();

  const [authError, setAuthError] = useState<string | null>(null);

  const onSubmit = async (data: RegisterFormData) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    setAuthError(null);
    try {
      await authService.register(payload);
      showSuccess(successMessages.ACCOUNT_CREATED);
      navigate("/login", { replace: true });
    } catch (error) {
      const message = handleApiError(error);
      if (/email/i.test(message)) {
        setError("email", { message });
        return;
      }
      setAuthError(message);
    }
  };

  return (
    <SignInContainer direction="column">
      <Card variant="outlined">
        <SignInTitle component="h1" variant="h4">
          Create your account
        </SignInTitle>
        <SignInLede>Start a list you can finish today.</SignInLede>
        {authError && <FormAlert error={authError} severity="error" />}
        <SignInForm
          onSubmit={handleSubmit(onSubmit, () => setAuthError(null))}
          onChange={() => {
            if (authError) setAuthError(null);
          }}
          noValidate
        >
          <TextInput
            label="Name"
            placeholder="Your name"
            required
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />
          <TextInput
            label="Email"
            placeholder="you@studio.com"
            type="email"
            required
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <PasswordField
            label="Password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />
          <PasswordField
            label="Confirm password"
            placeholder="Re-enter your password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </SignInForm>
        <SocialAuthBox>
          <SignUpText>
            Already have an account?{" "}
            <CenteredLink component={RouterLink} to="/login" variant="body2">
              Sign in
            </CenteredLink>
          </SignUpText>
        </SocialAuthBox>
      </Card>
    </SignInContainer>
  );
}
