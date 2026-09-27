import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const CustomFormLabel = styled((props: any) => (
  <Typography
    required={props.required}
    {...props}
    component="label"
    htmlFor={props.htmlFor}
  />
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
