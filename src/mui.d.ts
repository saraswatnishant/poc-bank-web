import "@mui/material/styles";

// Extend the Theme interface to include your custom properties
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }

  // Extend the ThemeOptions interface to include your custom components
  interface ThemeOptions {
    MuiAppBar?: {
      styleOverrides?: {
        colorPrimary?: {
          backgroundColor?: string;
        };
      };
    };
  }
}
