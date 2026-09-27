import type { TextFieldProps } from "@mui/material";

export type TextInputProps = TextFieldProps & {
  label: string;
  required?: boolean;
  otherHelperText?: string;
};
