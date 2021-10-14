import axios from 'axios';
import { Typography, Avatar, Button, Box, Link as MuLink } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FormattedMessage } from 'react-intl';
import { Alert } from '@material-ui/lab';
import { LockOutlined } from '@material-ui/icons';
import { TextInput } from '../components';
import { useState } from 'react';
import { Auth as AuthLayout } from '../layouts';
import Auth from '../Auth';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => {
  return {
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main
    },

    form: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
    }
  }
});

export default function Login(props) {
  const classes = useStyles();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);


  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
        email,
        password
      });

      Auth.login(result.data.user);
      props.history.push('/');
    } catch (error) {
      setHasError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>

      <Typography component='h1' variant='h4'>
        <FormattedMessage id={'title.login'} />
      </Typography>
      {
        hasError && (
          <Box marginTop={2}>
            <Alert severity='error'>
              <FormattedMessage id='error.login' />
            </Alert>
          </Box>
        )
      }

      <form className={classes.form} onSubmit={onSubmit}>
        <TextInput
          required
          label='input.email'
          type='email'
          autoComplete='email'
          onChange={setEmail}
        />

        <TextInput
          required
          label='input.password'
          type='password'
          autoComplete='password'
          onChange={setPassword}
        />

        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          disabled={loading}
        >
          <FormattedMessage id={'btn.continue'} />
        </Button>

        <Box marginTop={2}>
          <NoAccount />
        </Box>
      </form>
    </ AuthLayout>
  )
}

function NoAccount() {
  return (
    <Typography align='center'>
      <Link to='/register'>
        <MuLink variant='body2'>
          <FormattedMessage id={'dontHaveAccount'} />
        </MuLink>
      </Link>
    </Typography>
  )
}