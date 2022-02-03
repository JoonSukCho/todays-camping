import { createMuiTheme } from '@material-ui/core/styles';

const PRIMARY_COLOR = '#3182f6';
const SECONDARY_COLOR = 'rgba(0, 0, 0, 0.26)';
const SUCCESS_COLOR = '#20c997';

// export const theme = {
//   colors: {
//     primary: PRIMARY_COLOR,
//     secondary: 'rgba(0, 0, 0, 0.26)',
//     success: '#20c997',
//   },
// };

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
  },
  typography: {
    fontFamily: [
      'Spoqa Han Sans Neo',
      '"Segoe UI"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
