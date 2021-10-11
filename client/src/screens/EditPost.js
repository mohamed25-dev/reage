import { useEffect } from 'react';
import {
  Typography,
  makeStyles,
  Button,
  Box,
  Container,
  CssBaseline,
  Input,
  Paper,
  IconButton,
  Grid
} from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { FormattedMessage } from 'react-intl';
import { MainLayout } from '../layouts'

import { TextInput, TextField } from '../components';
import { useState } from 'react';
import postHooks from '../hooks/postsHooks';
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
      marginTop: theme.spacing(2),
      width: '60%'
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

export default function EditPost(props) {
  const postId = props.match.params.id;
  const classes = useStyles();

  const { getPost, updatePost } = postHooks();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    (async () => {
      const [post, error] = await getPost(postId);
      if (error) {
        props.history.push('/');
        return;
      }

      setTitle(post.title);
      setBody(post.body);
      setFile(`${process.env.REACT_APP_BACKEND_URL}/${post.image}`)
    })();

  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (image) {
      formData.append('image', image, image.name);
    }

    formData.append('title', title);
    formData.append('body', body);
    
    setLoading(true);
    const [_, errors] = await updatePost(postId, formData);
    setLoading(false);

    if (errors) {
      setHasError(true);
      setErrors(errors);
    } else {
      props.history.push('/');
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
      <Container component="main" maxWidth='md'>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4'>
            <FormattedMessage id={'post.edit'} />
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
              Component='TextInput'
              label='post.title'
              type='text'
              value={title}
              onChange={titleChangeHandler}
            />

            <div>
              <TextField
                required
                label='post.body'
                multiline
                rows={4}
                value={body}
                onChange={bodyChangeHandler}
              />
            </div>

            <Grid container spacing={2} className={classes.image}>
              <Grid item xs={6}>
                <label htmlFor="icon-button-file">
                  <Input accept="image/*" id="icon-button-file" type="file" className={classes.imageInput} onChange={imageChangeHandler} />
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                    <FormattedMessage id='post.image' />
                  </IconButton>
                </label>
              </Grid>

              <Grid item xs={4}>
                <img src={file} className={classes.imagePreview} />
              </Grid>
            </Grid>

            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={loading}
            >
              <FormattedMessage id={'btn.edit'} />
            </Button>
          </form>
        </Paper>
      </Container>
    </MainLayout>
  )
}
