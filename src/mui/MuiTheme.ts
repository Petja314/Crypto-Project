import {Card, createTheme, styled, Theme} from "@mui/material";
import {lime} from "@mui/material/colors";

export const theme : Theme = createTheme({
    typography: {
        fontFamily: `Titillium Web, Roboto Condensed, Open Sans, Arial, sans-serif` ,
    },
    palette: {
        mode: "dark",
        primary: lime,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    color: '#B8B8B8',
                    letterSpacing: "-0.5px",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: 15,
                    transition: ".3s ease-in-out",
                    padding: "10px 40px 10px 40px",
                    borderRadius: "12px",
                    backgroundColor: '#e0f64b',
                    color: "#171717",
                    '&:hover': {
                        backgroundColor: '#171717',
                        color: "#fff",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius : "20px",
                    padding: "16px",
                },
            },
        },
        MuiTableRow: { // Add styles for MuiTableRow
            styleOverrides: {
                root: {
                    whiteSpace: "nowrap"
                },
            },
        },
    },
});

export const StyledCard = styled(Card)(({theme: any}) => ({
    transition: "transform 0.15s ease-in-out",
    "&:hover": {transform: "scale3d(1.09, 1.09, 1)"},
}))


export const commonButtonStyles = {
    border: "1px solid #333",
    background: "#171717",
    color: "#fff",
    '&:hover': {
        border: "1px solid #e0f64b",
    },
};
