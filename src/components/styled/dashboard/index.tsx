import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const serif =
  '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif';

export const ListContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  justifyContent: "flex-start",
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

export const ListCard = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  marginInline: "auto",
  borderRadius: 16,
  backgroundColor: "#f7f6f2",
  borderColor: "#e3ddd3",
  [theme.breakpoints.up("sm")]: {
    maxWidth: 760,
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
  "& .MuiButton-contained": {
    height: 46,
    borderRadius: 10,
    backgroundColor: "#0e6b52",
    fontSize: "0.95rem",
    minWidth: 88,
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

export const PageHeader = styled(Box)({
  position: "relative",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  width: "100%",
  minHeight: 36,
  marginBottom: 16,
});

export const ProfileButton = styled("button")(({ theme }) => ({
  width: 36,
  height: 36,
  borderRadius: 999,
  border: "1px solid #e3ddd3",
  backgroundColor: "#fffcf8",
  color: "#0e6b52",
  font: "inherit",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.02em",
  cursor: "pointer",
  flexShrink: 0,
  "&[aria-expanded='true']": {
    backgroundColor: "#0e6b52",
    borderColor: "#0e6b52",
    color: "#fffcf8",
  },
  "&:focus-visible": {
    outline: "2px solid #0e6b52",
    outlineOffset: 2,
  },
  "&:disabled": {
    cursor: "default",
    opacity: 0.6,
  },
  ...theme.applyStyles("dark", {
    borderColor: "#34382f",
    backgroundColor: "#141613",
    color: "#8ed9c4",
    "&[aria-expanded='true']": {
      backgroundColor: "#8ed9c4",
      borderColor: "#8ed9c4",
      color: "#10231c",
    },
  }),
}));

export const ProfileMenu = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "calc(100% + 8px)",
  right: 0,
  width: 240,
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  borderRadius: 16,
  backgroundColor: "#f7f6f2",
  border: "1px solid #e3ddd3",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    backgroundColor: "#1a1c18",
    borderColor: "#34382f",
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export const ProfileName = styled(Typography)({
  margin: 0,
  fontSize: "0.95rem",
  fontWeight: 600,
  lineHeight: 1.3,
});

export const ProfileEmail = styled(Typography)(({ theme }) => ({
  margin: 0,
  color: theme.palette.text.secondary,
  fontSize: "0.8125rem",
  lineHeight: 1.4,
}));

export const ProfileDivider = styled(Box)(({ theme }) => ({
  height: 1,
  margin: "10px 0",
  backgroundColor: "#e3ddd3",
  ...theme.applyStyles("dark", {
    backgroundColor: "#34382f",
  }),
}));

export const LogoutButton = styled("button")(({ theme }) => ({
  width: "100%",
  height: 40,
  borderRadius: 10,
  border: "1px solid #e3ddd3",
  background: "transparent",
  color: theme.palette.text.primary,
  font: "inherit",
  fontSize: "0.875rem",
  fontWeight: 500,
  cursor: "pointer",
  "&:hover": {
    borderColor: "#0e6b52",
    color: "#0e6b52",
  },
  "&:focus-visible": {
    outline: "2px solid #0e6b52",
    outlineOffset: 2,
  },
  "&:disabled": {
    cursor: "default",
    opacity: 0.6,
  },
  ...theme.applyStyles("dark", {
    borderColor: "#34382f",
    "&:hover": {
      borderColor: "#8ed9c4",
      color: "#8ed9c4",
    },
  }),
}));

export const ListTitle = styled(Typography)({
  width: "100%",
  margin: 0,
  fontFamily: serif,
  fontSize: "2rem",
  fontWeight: 500,
  letterSpacing: "-0.03em",
  lineHeight: 1.15,
}) as typeof Typography;

export const ListLede = styled(Typography)(({ theme }) => ({
  margin: 0,
  marginTop: 4,
  color: theme.palette.text.secondary,
  fontSize: "0.95rem",
}));

export const ComposerForm = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const ComposerStack = styled(Box)({
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const ComposerInput = styled(TextField)({
  flex: 1,
  minWidth: 0,
});

export const TaskList = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

export const TaskRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== "divided" && prop !== "editing",
})<{ divided?: boolean; editing?: boolean }>(({ theme, divided, editing }) => ({
  display: "flex",
  alignItems: editing ? "flex-start" : "center",
  gap: 4,
  minHeight: 44,
  borderBottom: divided ? "1px solid #e3ddd3" : "none",
  ...theme.applyStyles("dark", {
    borderBottom: divided ? "1px solid #34382f" : "none",
  }),
}));

export const TaskBody = styled(Box)({
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "8px 4px",
});

export const TaskDescription = styled("span")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.8125rem",
  lineHeight: 1.4,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

export const EditFields = styled(Box)({
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const ActionGroup = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
});

export const TaskTitleButton = styled("button")(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  textAlign: "left",
  background: "transparent",
  border: "none",
  padding: "8px 4px",
  cursor: "pointer",
  color: theme.palette.text.primary,
  font: "inherit",
  fontSize: "0.95rem",
  lineHeight: 1.4,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  "&:focus-visible": {
    outline: "2px solid #0e6b52",
    outlineOffset: 2,
    borderRadius: 6,
  },
}));

export const DoneTitle = styled("span")(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  padding: "8px 4px",
  color: theme.palette.text.secondary,
  fontSize: "0.95rem",
  lineHeight: 1.4,
  textDecoration: "line-through",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

export const IconAction = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  flexShrink: 0,
  "&:hover": {
    color: "#0e6b52",
    backgroundColor: "transparent",
  },
  "&:focus-visible": {
    outline: "2px solid #0e6b52",
    outlineOffset: 2,
  },
  ...theme.applyStyles("dark", {
    "&:hover": {
      color: "#8ed9c4",
      backgroundColor: "transparent",
    },
  }),
}));

export const CompletedBlock = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  borderTop: "1px solid #e3ddd3",
  paddingTop: 8,
  ...theme.applyStyles("dark", {
    borderTop: "1px solid #34382f",
  }),
}));

export const CompletedToggle = styled("button")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  alignSelf: "flex-start",
  border: "none",
  background: "transparent",
  color: theme.palette.text.secondary,
  font: "inherit",
  fontSize: "0.8125rem",
  fontWeight: 500,
  cursor: "pointer",
  padding: 0,
  borderRadius: 6,
  "& .MuiSvgIcon-root": {
    fontSize: 18,
  },
  "&:focus-visible": {
    outline: "2px solid #0e6b52",
    outlineOffset: 2,
  },
}));
