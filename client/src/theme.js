import { createTheme } from '@mui/material/styles';
import { teal, red } from '@mui/material/colors';


const theme = createTheme({
  direction: 'rtl',
  typography: {
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  },
  palette: {
    primary: teal,
    secondary: red,
  },
});

export default theme;