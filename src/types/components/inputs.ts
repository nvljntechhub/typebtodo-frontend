import type { TextFieldProps } from "@mui/material";

export type TextInputProps = TextFieldProps & {
  label: string;
  required?: boolean;
  otherHelperText?: string;
};

export type RichTextInputProps = {
  label: string;
  required?: boolean;
  otherHelperText?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  maxLength?: number;
};
