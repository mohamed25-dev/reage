import axios from 'axios';
import { Typography, Avatar, Button, Box, Link as MuLink } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Alert } from '@material-ui/lab';
import { LockOutlined } from '@mui/icons-material';
import { FormattedMessage } from 'react-intl';
import { Auth as AuthLayout } from '../layouts'
import Auth from '../Auth';

import { TextInput } from '../components';
import { useState } from 'react';

const useStyles = makeStyles((theme) => {
  return {
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main
    },

    form: {
      marginTop: theme.spacing(2),
    }
  }
});

export default function Login(props) {
  const classes = useStyles();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        name,
        email,
        password,
        confirmPassword
      });

      Auth.login(result.data.user);
      props.history.push('/');

    } catch (error) {
      setHasError(true);
      setErrors(error.response.data.errors);
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
        <FormattedMessage id={'title.register'} />
      </Typography>
      {
        hasError && (
          <Box marginTop={2}>

            <Alert severity='error'>
              <br />
              {
                errors.map(e => (
                  <li>
                    {e}
                  </li>
                ))
              }
            </Alert>
          </Box>
        )
      }

      <form className={classes.form} onSubmit={onSubmit}>
        <TextInput
          required
          label='input.name'
          type='text'
          onChange={setName}
        />

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

        <TextInput
          required
          label='input.passwordConfirmation'
          type='password'
          autoComplete='password'
          onChange={setConfirmPassword}
        />

        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          disabled={loading}
        >
          <FormattedMessage id={'btn.send'} />
        </Button>

        <Box marginTop={2}>
          <NoAccount />
        </Box>
      </form>
    </AuthLayout>
  )
}

function NoAccount() {
  return (
    <Typography align='center'>
      <MuLink href='/login' passHref>
        <MuLink variant='body2'>
          <FormattedMessage id={'haveAccount'} />
        </MuLink>
      </MuLink>
    </Typography>
  )
}