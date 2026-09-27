import FormControlLabel from "@mui/material/FormControlLabel";
import MuiSwitch, {
  type SwitchProps as MuiSwitchProps,
} from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const StyledSwitch = styled(MuiSwitch)(({ theme }) => ({
  margin: 0,
  "&& .MuiSwitch-switchBase.Mui-checked": {
    color: "#ffffff",
  },
  "&& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#0e6b52",
    opacity: 1,
  },
  ...theme.applyStyles("dark", {
    "&& .MuiSwitch-switchBase.Mui-checked": {
      color: "#10231c",
    },
    "&& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#8ed9c4",
      opacity: 1,
    },
  }),
}));

type SwitchProps = MuiSwitchProps & {
  label?: string;
};

export default function Switch({ label, ...props }: SwitchProps) {
  const control = <StyledSwitch color="default" {...props} />;

  if (!label) {
    return control;
  }

  return (
    <FormControlLabel
      control={control}
      label={label}
      sx={{ marginLeft: -0.75, marginRight: 0 }}
    />
  );
}
