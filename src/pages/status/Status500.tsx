import { Link as RouterLink } from "react-router";
import { Button } from "@mui/material";
import { CenteredLink } from "@/components/styled/auth";
import StatusView from "./StatusView";

const Status500 = () => {
  return (
    <StatusView
      badge="500"
      title="Something went wrong"
      description="An unexpected error came from our end. Try again in a moment."
    >
      <Button
        fullWidth
        variant="contained"
        onClick={() => window.location.reload()}
      >
        Try again
      </Button>
      <CenteredLink component={RouterLink} to="/task-view" variant="body2">
        Back to your tasks
      </CenteredLink>
    </StatusView>
  );
};

export default Status500;
