import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const StatusBadge = styled(Typography)(({ theme }) => ({
  alignSelf: "flex-start",
  margin: 0,
  padding: "4px 12px",
  borderRadius: 999,
  backgroundColor: "#e6efe9",
  color: "#0e6b52",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  ...theme.applyStyles("dark", {
    backgroundColor: "#1f3a31",
    color: "#8ed9c4",
  }),
}));

export const StatusActions = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(1),
}));
