import { createTheme } from "@mui/material/styles";

const darkGreen = "#3E753B";
const black = '#000';
const grey = '#585858';
const mediumGrey = '#757575';
const white = '#fff';
const boxShadow = '2px 2px 4px 0px rgba(127, 127, 132, 0.2)';
const lightGreen = "#EFFAEF"

const theme = createTheme({
    palette: {
        primary: {
            light: lightGreen,
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
    MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "4px",
            textTransform: "none",
          },
          outlined: {
            borderRadius: "8px",
            border: "2px solid #ccc",
            color: '#000',
            fontWeight: 600,
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            boxShadow,
            "&:hover": {
              backgroundColor: '#f7f7f7',
              boxShadow: 'none',
            },
          },
        },
      },
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
            borderRadius: "8px",
          },
        },
      },
      MuiTooltip: {
        defaultProps: {
            arrow: true,
            enterDelay: 250,
            enterNextDelay: 250,
            slotProps: {
                tooltip: {
                    sx: {
                      fontSize: '1rem',
                      backgroundColor: '#333',
                    },
                  },
                  arrow: {
                    sx: {
                      color: "#333",
                    },
                  },
            },
        },
      }
  },
});

export default theme;