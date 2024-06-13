import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5ACCCC",
      light: "#FABD33",
      dark: "#335C6E",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#CFFAFF",
      light: "#F76434",
      dark: "#4AA088",
      contrastText: "#FAAD00"
    },
    error:  {
      main:  "#F76434"
    }
  },
  typography: {
    fontFamily: "Mulish, Arial, sans-serif",
    
  },
});

export default theme;