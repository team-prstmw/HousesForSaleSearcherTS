import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7ED6DF',
      contrastText: '#fff',
      muted: '#535C6899',
      bgDark: '#000',
    },
    secondary: {
      main: '#30336B',
    },
    error: {
      main: '#EB4D4B',
    },
  },
});

export default theme;
