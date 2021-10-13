import { makeStyles } from '@mui/styles';
import { Container, CssBaseline, Paper, Box, Typography, Link } from '@mui/material';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: 'url("images/bg/login.jpg")'
  },
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export default function Auth({ children, width = 'xs' }) {
  const classes = useStyles();

  return <div className={classes.root}>
    <Container component="main" maxWidth={width}>
      <CssBaseline />
      <Paper className={classes.paper}>
        
        {children}

        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            <FormattedMessage id='copyright' />
            {' '}
            <Link color="inherit" href="/">
              <FormattedMessage id='app.name' />
            </Link>
          </Typography>
        </Box>

      </Paper>
    </Container>
  </div>

}