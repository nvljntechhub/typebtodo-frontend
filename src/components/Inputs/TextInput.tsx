import { forwardRef } from "react";
import { CustomTextField, StyledRequiredFieldIndicator } from "../styled";
import CustomFormLabel from "../CustomFormLabel";
import type { TextInputProps } from "@/types/components/inputs";
import { Box, FormHelperText } from "@mui/material";

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { label, required, otherHelperText, placeholder, ...textFieldProps },
    ref,
  ) => {
    return (
      <Box>
        {label && (
          <CustomFormLabel>
            {label} {required && <StyledRequiredFieldIndicator />}
          </CustomFormLabel>
        )}
        <CustomTextField
          {...textFieldProps}
          inputRef={ref}
          fullWidth
          placeholder={placeholder ?? (label ? `Enter ${label}` : undefined)}
        />
        {otherHelperText && <FormHelperText>{otherHelperText}</FormHelperText>}
      </Box>
    );
  },
);

export default TextInput;
