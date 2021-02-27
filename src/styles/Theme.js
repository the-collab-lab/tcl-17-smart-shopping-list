import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    ourblue: {
      main: '#a1dffb',
    },
    red: {
      main: '#c33124',
    },
    orange: {
      main: '#e8a628',
    },
    yellow: {
      main: '#F9de59',
    },
  },
});

console.log('theme file ', theme);

// #F9de59 : yellow (not-too-soon)
// #e8a628: orange (kind-of-soon)
// #f98365: salmon (soon)
// #c33124: red (soon)
// #a1dffb: blue (header/nav backgrounds)
