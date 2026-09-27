import {
  useState,
  forwardRef,
  type ChangeEventHandler,
  type FocusEventHandler,
} from "react";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Box,
} from "@mui/material";
import { StyledRequiredFieldIndicator } from "../styled";
import CustomFormLabel from "../CustomFormLabel";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordFieldProps {
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  name?: string;
  required?: boolean;
  disableToggleUntilEdited?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      label,
      placeholder = "Enter your password",
      error,
      helperText,
      required = true,
      disableToggleUntilEdited = false,
      onFocus,
      onBlur,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);
    const [hasEdited, setHasEdited] = useState(false);
    const isToggleDisabled = disableToggleUntilEdited && !hasEdited;

    const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
      setFocused(false);
      onBlur?.(e);
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      if (disableToggleUntilEdited && !hasEdited) {
        setHasEdited(true);
      }
      onChange?.(e);
    };

    return (
      <Box>
        {label && (
          <CustomFormLabel>
            {label}
            {required && <StyledRequiredFieldIndicator />}
          </CustomFormLabel>
        )}
        <FormControl fullWidth variant="outlined" error={error}>
          <OutlinedInput
            {...rest}
            inputRef={ref}
            type={showPassword ? "text" : "password"}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={placeholder}
            sx={{ height: 46, borderRadius: "10px" }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                  disabled={isToggleDisabled}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  color={error ? "error" : focused ? "primary" : "default"}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      </Box>
    );
  },
);

export default PasswordField;
