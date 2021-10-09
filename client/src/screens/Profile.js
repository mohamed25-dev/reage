import axios from 'axios';
import { useEffect, useState } from 'react';
import { makeStyles, Button, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { MainLayout } from '../layouts';
import { TextInput } from '../components';
import { FormattedMessage } from 'react-intl';
import Auth from '../Auth';

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(2),
    paddingTop: theme.spacing(2)
  },
  alert: {
    marginBottom: theme.spacing(2),
  },
}));

const updateProfile = async ({email, name}) => {
  const result = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/users/profile`, {
    email,
    name
  });

  await sleep(1);
  return result;
}

const updatePassword = async ({password, newPassword}) => {
  return  axios.patch(`${process.env.REACT_APP_BACKEND_URL}/users/password`, {
    password,
    newPassword
  });
}

const sleep = (time) => new Promise((resolve, reject) => setTimeout(resolve, time * 1000));

export default function Profile() {

  const classes = useStyles();

  const [profileData, setProfileData] = useState();
  const [passwordData, setPasswordData] = useState();
  const [loading, setLoading] = useState({ profile: false, password: false });
  const [error, setError] = useState({ profile: false, password: false });

  const user = Auth.auth();

  useEffect(() => {
    if (!user) return;
    const { name, email } = user;
    setProfileData({ name, email });

  }, []);

  const onSubmitProfile = async (event) => {
    event.preventDefault();
    setLoading({ ...loading, profile: true });

    try {
      const result = await updateProfile(profileData);
      Auth.setUser(result.data.user);
      setError({ ...error, profile: false });
    } catch (e) {
      console.log(e)
      setError({ ...error, profile: true });
    } finally {
      setLoading({ ...loading, profile: false });
    }
  }

  const onSubmitPassword = async (event) => {
    event.preventDefault();
    setLoading({ ...loading, password: true });
    try {
      await updatePassword(passwordData);
      setError({ ...error, password: false });
    } catch (e) {
      setError({ ...error, password: e.response.data.errors });
    } finally {
      setLoading({ ...loading, password: false })
    }
  }

  return (
    <MainLayout title='title.profile'>
      <Grid container>
        <Grid item md={6} xs={12}>
          {
            user &&
            <form className={classes.form} onSubmit={onSubmitProfile}>
              <TextInput
                required
                label="input.name"
                value={profileData?.name}
                variant='outlined'
                onChange={name => setProfileData({ ...profileData, name })}
              />

              <TextInput
                required
                label="input.email"
                value={profileData?.email}
                variant='outlined'
                type="email"
                onChange={email => setProfileData({ ...profileData, email })}
              />
              {
                error.profile &&
                <Alert severity='error' className={classes.alert}>
                  <FormattedMessage id='error.update_profile' />
                </Alert>
              }
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading.profile}
              >
                <FormattedMessage id={'btn.save'} />
              </Button>

            </form>
          }
        </Grid>
        <Grid item md={6} xs={12}>
          {
            user &&
            <form className={classes.form} onSubmit={onSubmitPassword}>

              <TextInput
                required
                label="input.current_password"
                type="password"
                variant='outlined'
                onChange={password => {
                    setPasswordData({ ...passwordData, password });
                    setError({...error, password: false})
                  }
                }
              />

              <TextInput
                required
                label="input.new_password"
                type="password"
                variant='outlined'
                onChange={newPassword => {
                  setPasswordData({ ...passwordData, newPassword });
                  setError({...error, password: false})
                }}
              />
              {
                error.password &&
                <Alert severity='error' className={classes.alert}>
                  {error.password}
                </Alert>
              }
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading.password}
              >
                <FormattedMessage id={'btn.change_password'} />
              </Button>
            </form>
          }
        </Grid>
      </Grid>
    </MainLayout>
  )
}