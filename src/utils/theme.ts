import { createTheme } from "@mui/material/styles";

const darkGreen = "#3E753B";
const black = '#000';
const grey = '#585858';
const mediumGrey = '#a7a7a7';
const white = '#fff';

const theme = createTheme({
    palette: {
        primary: {
            light: "#EFFAEF",
            main: "#D4ECD4",
            dark: darkGreen,
        },
        grey: {

        },
    },
    typography: {
        fontFamily: "'Inter', sans-serif",
        h1: {
            fontSize: "1.5rem",
            fontWeight: 700,
            color: black,
        },
        h2: {
            fontSize: "1.25rem",
            fontWeight: 700,
            color: black,
        },
        h3: {
            fontSize: "1.25rem",
            fontWeight: 700,
            color: darkGreen,
        },
        h4: {
            fontSize: "1.25rem",
            fontWeight: 600,
            color: black,
        },
        h5: {
            fontSize: "1rem",
            fontWeight: 700,
            color: black,
        },
        h6: {
            fontSize: "1rem",
            fontWeight: 600,
            color: darkGreen,
        },
        body1: {
            fontSize: "1rem",
            fontWeight: 400,
            color: black,
        },
        body2: {
            fontSize: "1rem",
            fontWeight: 400,
            color: grey,
        },
        subtitle1: {
            fontSize: "1rem",
            fontWeight: 400,
            color: darkGreen,
        },
        subtitle2: {
            fontSize: "1rem",
            fontWeight: 400,
            color: mediumGrey,
        },
        button: {
            fontSize: "1rem",
            fontWeight: 600,
            color: darkGreen,
        },
        overline: {
            fontSize: "1rem",
            fontWeight: 600,
            color: white,
            lineHeight: 1.75,
        },
        caption: {
            fontSize: '0.75rem',
            fontWeight: 400,
            color: mediumGrey,
        }
    },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            color: '#000',
            backgroundColor: '#EFEFEF',
            borderRadius: 8,
            "&:hover": {
                backgroundColor: '#e8e8e8',
                borderColor: "transparent"
            },
            "& .MuiInputBase-input": {
                padding: '12px 16px',
            },
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#BABABA",
            },
          },
        },
      },
    },
    MuiPopover: {
        styleOverrides: {
          paper: {
            borderRadius: "8px", // Apply rounded corners globally
          },
        },
      },
  },
});

export default theme;