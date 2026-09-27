import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router";

import {
  SignInContainer,
  Card,
  SignInTitle,
  SignInLede,
  SignInForm,
  CenteredLink,
  OptionsRow,
  SocialAuthBox,
  SignUpText,
} from "@/components/styled/auth";
import TextInput from "@/components/Inputs/TextInput";
import PasswordField from "@/components/Inputs/PasswordField";
import Switch from "@/components/ui/Switch";
import { Button } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/form-handling/validation-schema";
import type { LoginFormData } from "@/utils/form-handling/validation-schema";
import { handleApiError } from "@/utils/error-handler.utils";
import FormAlert from "@/components/ui/Alert";
import { useSnackbarAlert } from "@/hooks/useSnackbar";
import { successMessages } from "@/utils/properties";
import { useAuth } from "@/context/AuthProvider";
import { consumeSessionEndedNotice } from "@/utils/sessionExpiry.utils";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const { login } = useAuth();
  const { showSuccess } = useSnackbarAlert();

  const [remember, setRemember] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (consumeSessionEndedNotice()) {
      setAuthError("Your session ended. Sign in again.");
    }
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    setAuthError(null);
    try {
      await login(data);
      showSuccess(successMessages.LOGIN_SUCCESS);
    } catch (error) {
      setAuthError(handleApiError(error));
    }
  };

  return (
    <SignInContainer direction="column">
      <Card variant="outlined">
        <SignInTitle component="h1" variant="h4">
          Welcome back
        </SignInTitle>
        <SignInLede>Sign in to pick up today&apos;s list.</SignInLede>
        {authError && <FormAlert error={authError} severity="error" />}
        <SignInForm onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <OptionsRow>
            <Switch
              label="Remember this device"
              size="small"
              checked={remember}
              onChange={(_, checked) => setRemember(checked)}
            />
            <CenteredLink
              component={RouterLink}
              to="/forgot-password"
              variant="body2"
            >
              Forgot password
            </CenteredLink>
          </OptionsRow>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </SignInForm>
        <SocialAuthBox>
          <SignUpText>
            New here?{" "}
            <CenteredLink component={RouterLink} to="/register" variant="body2">
              Create an account
            </CenteredLink>
          </SignUpText>
        </SocialAuthBox>
      </Card>
    </SignInContainer>
  );
}
