import { Link as RouterLink } from "react-router";
import { Button } from "@mui/material";
import { CenteredLink } from "@/components/styled/auth";
import StatusView from "./StatusView";

const Status404 = () => {
  return (
    <StatusView
      badge="404"
      title="Page not found"
      description="The page you're looking for doesn't exist or may have moved."
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

export default Status404;
