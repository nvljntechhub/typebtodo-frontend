import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data",
  },
  defaultColorScheme: "light",
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#1565c0" },
        secondary: { main: "#00897b" },
        background: {
          default: "#f6f7fb",
          paper: "#ffffff",
        },
        text: {
          primary: "#1a1c1e",
          secondary: "#5c6570",
          disabled: "#9aa3af",
        },
      },
    },
    dark: {
      palette: {
        primary: { main: "#90caf9" },
        secondary: { main: "#80cbc4" },
        background: {
          default: "#121212",
          paper: "#1e1e1e",
        },
        text: {
          primary: "#f2f4f7",
          secondary: "#b0b8c4",
          disabled: "#6e7784",
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});
