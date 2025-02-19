import { createTheme } from "@mui/material/styles";

const theme = createTheme({
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