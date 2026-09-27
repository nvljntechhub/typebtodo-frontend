import { Link as RouterLink } from "react-router";
import { Button } from "@mui/material";
import { CenteredLink } from "@/components/styled/auth";
import StatusView from "./StatusView";

const StatusMaintenance = () => {
  return (
    <StatusView
      badge="Maintenance"
      title="Down for upkeep"
      description="We're making some scheduled improvements. This will only take a little while."
    >
      <Button
        component={RouterLink}
        to="/task-view"
        fullWidth
        variant="contained"
      >
        Back to your tasks
      </Button>
      <CenteredLink component={RouterLink} to="/login" variant="body2">
        Sign in
      </CenteredLink>
    </StatusView>
  );
};

export default StatusMaintenance;
