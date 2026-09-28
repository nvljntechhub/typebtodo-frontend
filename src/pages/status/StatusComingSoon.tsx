import { Link as RouterLink } from "react-router";
import { Button } from "@mui/material";
import { CenteredLink } from "@/components/styled/auth";
import StatusView from "./StatusView";

const StatusComingSoon = () => {
  return (
    <StatusView
      badge="Coming soon"
      title="Almost ready"
      description="We're putting the finishing touches on this page. Check back shortly."
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

export default StatusComingSoon;
