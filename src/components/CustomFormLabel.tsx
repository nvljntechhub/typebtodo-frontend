import { styled } from "@mui/material/styles";
import { Typography, type TypographyProps } from "@mui/material";

type CustomFormLabelProps = Omit<TypographyProps<"label">, "component">;

const CustomFormLabel = styled((props: CustomFormLabelProps) => (
  <Typography {...props} component="label" />
))(({ theme }) => ({
  marginBottom: "4px",
  display: "block",
  fontFamily: "'Roboto', sans-serif",
  fontSize: "0.79rem",
  fontWeight: 600,
  color: theme.palette.text.secondary,
  letterSpacing: "0.01em",
  textTransform: "capitalize",
}));

export default CustomFormLabel;
