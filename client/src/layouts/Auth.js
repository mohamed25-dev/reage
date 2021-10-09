import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Paper, Box, Typography, Link } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import AuthService from '../Auth';
import { Redirect, Route } from 'react-router-dom'

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
  const isLoggedIn = AuthService.auth();

  const render = isLoggedIn
    ?
    <Redirect to='/' />
    :
    (
      <div className={classes.root}>
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
    )

  return render;
}