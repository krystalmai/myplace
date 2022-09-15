import React from "react";
import { alpha,
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import customizeComponents from "./customizations";

const PRIMARY = {
  lighter: "#b8fdf6",
  light: "#76fbed",
  main: "#34F9E4",
  dark: "#05a090",
  darker: "#035e55",
  contrastText: "#000000",
};

const SECONDARY = {
  lighter: "#dca1f0",
  light: "#bc4ae1",
  main: "#921EB8",
  dark: "#7b199b",
  darker: "#4c1060",
  contrastText: "#FFFFFF",
};
const SUCCESS = {
  lighter: "#b9fbc0",
  light: "#AAF27F",
  main: "#89f895",
  dark: "#38f44c",
  darker: "#066b11",
  contrastText: "#112A46",
};
const ERROR = {
  lighter: "#ffe0ee",
  light: "#ffadd1",
  main: "#FF9CC8",
  dark: "#ff7ab5",
  darker: "#ff4799",
  contrastText: "#000000",
};

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
      text: { primary: GREY[0], secondary: GREY[100], disabled: GREY[500] },
      error: ERROR,
      mode: "dark",

      contrastThreshold: 3,
      tonalOffset: 0.3,
    },

    shape: {
      borderRadius: 8,
    },
    
    
  };
  const theme = createTheme(themeOptions);
  theme.components = customizeComponents(theme)
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
