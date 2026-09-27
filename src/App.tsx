import { CssBaseline } from "@mui/material";
import "./App.css";
import routes from "./routes";
import { AppThemeProvider } from "./theme/AppThemeProvider";
import { SnackbarProvider } from "notistack";
import { StyledMaterialDesignContent } from "./theme/defaultColors";

function App() {
  return (
    <AppThemeProvider>
      {" "}
      <SnackbarProvider
        style={{ zIndex: 10000 }}
        Components={{
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent,
          warning: StyledMaterialDesignContent,
          info: StyledMaterialDesignContent,
        }}
      >
        <CssBaseline />
        {routes()}
      </SnackbarProvider>
    </AppThemeProvider>
  );
}

export default App;
