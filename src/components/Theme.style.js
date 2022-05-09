import {createTheme} from "@mui/material";


let theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    },
});

theme = {
    ...theme,
    overrides: {
    },

};

export default theme;
