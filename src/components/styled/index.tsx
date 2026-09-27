import { TextField, Typography } from "@mui/material";
import styled from "styled-components";

export const StyledRequiredFieldIndicator = styled(Typography)({
  variant: "subtitle2",
  fontWeight: 600,
  component: "label",
  display: "inline",
  color: "#EE95A0",
});

export const CustomTextField = styled(TextField)<{ multiline?: boolean }>(
  ({ theme, multiline }) => ({
    ...(!multiline && {
      "& .MuiOutlinedInput-root": {
        height: 40,
        boxSizing: "border-box",
      },
      "& .MuiOutlinedInput-input": {
        paddingTop: 10,
        paddingBottom: 10,
      },
    }),
    "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
      top: -6,
    },
    "& .MuiOutlinedInput-input.Mui-disabled::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
    "& .MuiOutlinedInput-root.Mui-disabled": {
      backgroundColor: theme.palette.grey[100],
      borderRadius: "6px",
    },
    "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.grey[200],
    },
    "& input:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.paper} inset`,
      WebkitTextFillColor: theme.palette.text.primary,
      transition: "background-color 5000s ease-in-out 0s",
    },
  }),
);
