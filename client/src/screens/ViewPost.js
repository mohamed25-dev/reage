import { useEffect } from 'react';
import {
  Typography,
  makeStyles,
  Box,
  Container,
  IconButton,
  Paper,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ThumbUpOutlined } from '@mui/icons-material';
import { FormattedMessage } from 'react-intl';
import { MainLayout } from '../layouts'

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
      width: '450px',
      height: '450px'
    }
  }
});

export default function EditPost(props) {
  const postId = props.match.params.id;
  const classes = useStyles();

  const { getPost, updatePost, likePost } = postHooks();
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

  return (
    <MainLayout>
      <Container component="main" maxWidth='md'>
        <Paper className={classes.paper}>
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
            <Typography variant='h4'>
              {title}
            </Typography>
            
            <img src={file} className={classes.image} />

            <Typography variant='h5'>
              {body}
            </Typography>

            <IconButton color="primary" aria-label="add to shopping cart" onClick={() => likePost(postId)}>
              <ThumbUpOutlined/>
            </IconButton>

          </form>
        </Paper>
      </Container>
    </MainLayout>
  )
}
