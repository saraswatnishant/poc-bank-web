import { createTheme, ThemeProvider, ThemeOptions } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";

// Define your custom theme options
const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#BF2051",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
};

// Create the theme using createTheme function
const theme = createTheme(themeOptions);

const useStyles = makeStyles()((theme) => {
  return {
    // Override the styles for the helper text
    helperText: {
      marginLeft: 0, // Set margin to 0
      color: theme.palette.error.main,
    },
  };
});

export { theme, ThemeProvider, useStyles };
