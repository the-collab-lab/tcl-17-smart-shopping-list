import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    blue: {
      main: '#a1dffb',
    },
    red: {
      main: '#c33124',
    },
    orange: {
      main: '#e8a628',
    },
    salmon: {
      main: '#f98365',
    },
    yellow: {
      // main: '#F9de59',
      main: '#fdf5cd',
    },
  },
});

export const useStyles = makeStyles((theme) => ({
  blue: {
    color: theme.palette.blue.main,
  },
  red: {
    color: theme.palette.red.main,
  },
  orange: {
    color: theme.palette.orange.main,
  },
  salmon: {
    color: theme.palette.salmon.main,
  },
  yellow: {
    color: theme.palette.yellow.main,
  },
}));
