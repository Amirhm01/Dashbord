import { createTheme } from "@mui/material/styles";
import {faIR} from "@mui/x-data-grid/locales";

const theme = createTheme({
    palette: {
        primary: {
            main: "#5c337e",
        },
        secondary: {
            main: "#dc004e",
        },
        background: {
            default: "#f8f8f8",
            paper: "#ffffff",
        },

    },
    shape: {
            borderRadius: 8,
        },
    typography: {
        fontFamily: "'Vazir', sans-serif",
    },
},
faIR
);

export default theme;
