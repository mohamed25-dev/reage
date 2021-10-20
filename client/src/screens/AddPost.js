import axios from 'axios';
import {
  Typography,
  Button,
  Box,
  Container,
  CssBaseline,
  Input,
  IconButton,
  Grid,
  Alert
} from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import { PhotoCamera } from '@mui/icons-material';
import { FormattedMessage } from 'react-intl';
import { MainLayout } from '../layouts'

import { TextInput, TextField } from '../components';
import { useState } from 'react';

const useStyles = makeStyles((theme) => {
  return {
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
    },
    form: {
      marginBottom: theme.spacing(2),
    },
    imageInput: {
      marginBottom: theme.spacing(2),
      display: 'none'
    },
    image: {
      marginBottom: theme.spacing(2),
    },
    imagePreview: {
      width: '100px',
      height: '100px'
    }
  }
});

export default function Login(props) {
  const classes = useStyles();

  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append('image', image, image.name);
      formData.append('title', title);
      formData.append('body', body);

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/posts`, formData);

      props.history.push('/');
    } catch (error) {
      setHasError(true);
      setErrors(error.response.data.errors);
    } finally {
      setLoading(false);
    }
  }

  const imageChangeHandler = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  }

  const titleChangeHandler = (value) => {
    setTitle(value);
    setErrors([]);
    setHasError(false)
  }

  const bodyChangeHandler = (value) => {
    setBody(value);
    setErrors([]);
    setHasError(false)
  }

  return (
    <MainLayout>
      <CssBaseline />
      <Container sx={{ width: '50%', alignItems: 'center', paddingTop: 2}}>
        <Typography component='h1' variant='h4'>
          <FormattedMessage id={'title.addPost'} />
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

        <form onSubmit={onSubmit} className={classes.form}>
          <TextInput
            required
            Component='TextInput'
            label='post.title'
            type='text'
            onChange={titleChangeHandler}
          />

          <TextField
            required
            label='post.body'
            multiline
            rows={4}
            onChange={bodyChangeHandler}
          />

          <Grid container spacing={2} >
            <Grid item xs={12} md={6}>
              <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" sx={{ display: 'none' }} onChange={imageChangeHandler} />
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera fontSize='large'/>
                </IconButton>
                <FormattedMessage id='post.image' />
              </label>
            </Grid>

            <Grid item xs={12} md={4}>
              <img src={file} className={classes.imagePreview} />
            </Grid>
          </Grid>

          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            sx={{marginTop: 2}}
            disabled={loading}
          >
            <FormattedMessage id={'btn.send'} />
          </Button>
        </form>
      </Container>
    </MainLayout>
  )
}
