import { Alert, Chip, Collapse, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const FormAlertCollapse = styled(Collapse)(() => ({
  width: "100%",
  minWidth: 0,
  maxWidth: "100%",
  flexShrink: 0,
}));

const FormAlertGrid = styled(Grid)(() => ({
  width: "100%",
  minWidth: 0,
  alignItems: "center",
})) as typeof Grid;

const FormAlertGrow = styled(Grid)(() => ({
  minWidth: 0,
})) as typeof Grid;

const FormAlertMessage = styled(Alert)({
  borderRadius: "8px",
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
  "& .MuiAlert-message": {
    overflowWrap: "break-word",
    wordBreak: "break-word",
  },
});

const FormAlertChip = styled(Chip)(() => ({
  borderRadius: "8px",
}));

type FormAlertProps = {
  error: string | null;
  label?: string;
  severity?: "error" | "warning" | "info" | "success";
};

const FormAlert = (props: FormAlertProps) => {
  const { error, severity = "error", label } = props;
  return (
    <FormAlertCollapse
      in={Boolean(error)}
      easing={{
        enter: "ease-out",
        exit: "ease-in",
      }}
    >
      <FormAlertGrid container spacing={2} wrap="nowrap">
        <FormAlertGrow size="grow">
          <FormAlertMessage severity={severity}>{error}</FormAlertMessage>
        </FormAlertGrow>
        {label && (
          <Grid size="auto">
            <FormAlertChip label={label} size="medium" />
          </Grid>
        )}
      </FormAlertGrid>
    </FormAlertCollapse>
  );
};

export default FormAlert;
