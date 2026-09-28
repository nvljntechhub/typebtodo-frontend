import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  borderRadius: 16,
  backgroundColor: "#f7f6f2",
  borderColor: "#e3ddd3",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  "&& .MuiOutlinedInput-root": {
    height: 46,
    borderRadius: 10,
    backgroundColor: "#fffcf8",
  },
  "&& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#e3ddd3",
  },
  "& .MuiInputLabel-root": {
    display: "none",
  },
  "& label": {
    textTransform: "none",
    fontSize: "0.8125rem",
    fontWeight: 500,
    letterSpacing: "0.01em",
  },
  "& .MuiButton-contained": {
    height: 46,
    borderRadius: 10,
    backgroundColor: "#0e6b52",
    fontSize: "0.95rem",
    "&:hover": {
      backgroundColor: "#0b5a45",
    },
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "#1a1c18",
    borderColor: "#34382f",
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    "&& .MuiOutlinedInput-root": {
      backgroundColor: "#141613",
    },
    "&& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#34382f",
    },
    "& .MuiButton-contained": {
      backgroundColor: "#8ed9c4",
      color: "#10231c",
      "&:hover": {
        backgroundColor: "#a5e6d4",
      },
    },
  }),
}));

export const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  justifyContent: "space-between",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export const SignInTitle = styled(Typography)({
  width: "100%",
  margin: 0,
  fontFamily:
    '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif',
  fontSize: "2rem",
  fontWeight: 500,
  letterSpacing: "-0.03em",
  lineHeight: 1.15,
}) as typeof Typography;

export const SignInLede = styled(Typography)(({ theme }) => ({
  margin: 0,
  color: theme.palette.text.secondary,
  fontSize: "0.95rem",
}));

export const SignInForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: theme.spacing(1),
}));

export const CenteredLink = styled(Link)(({ theme }) => ({
  alignSelf: "center",
  color: "#0e6b52",
  fontWeight: 500,
  textDecoration: "none",
  ...theme.applyStyles("dark", {
    color: "#8ed9c4",
  }),
})) as typeof Link;

export const OptionsRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
  "& .MuiFormControlLabel-root": {
    marginLeft: -6,
    marginRight: 0,
  },
  "& .MuiSwitch-root": {
    margin: 0,
  },
  "& .MuiFormControlLabel-label": {
    fontSize: "0.875rem",
    fontWeight: 500,
  },
});

export const SocialAuthBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const SignUpText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
}));
