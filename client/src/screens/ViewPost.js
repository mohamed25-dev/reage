import { useEffect } from 'react';
import {
  Typography,
  Box,
  Container,
  IconButton,
  Paper,
  Link,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions
} from '@mui/material';
import { pink } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import { Alert } from '@material-ui/lab';
import Auth from '../Auth';
import { ThumbUp, ThumbUpOutlined, Edit, Delete } from '@mui/icons-material';
import { FormattedMessage, useIntl } from 'react-intl';
import { MainLayout } from '../layouts'
import { AlertDialog } from '../components';
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
  const editUrl = `/posts/${postId}/edit`;
  const classes = useStyles();
  const { formatMessage } = useIntl();

  const { getPost, updatePost, likePost, deletePost } = postHooks();
  const [title, setTitle] = useState();
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [userId, setUserId] = useState(null);
  const [body, setBody] = useState();
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    Auth.init();
    (async () => {
      setLoading(true);
      const [post, error] = await getPost(postId);
      console.log(post);
      if (error) {
        setLoading(false);
        props.history.push('/');
        return;
      }

      setLoading(false);
      setTitle(post.title);
      setBody(post.body);
      setNumberOfLikes(post.numberOfLikes);
      setUserId(post.user);
      setLiked(post.liked);
      setFile(`${process.env.REACT_APP_BACKEND_URL}/${post.image}`)
    })();

  }, []);


  const handleLikeClick = async () => {
    const [post, error] = await likePost(postId);
    if (error) {
      return;
    }

    setNumberOfLikes(post.numberOfLikes);
    setLiked(post.liked);
  }

  const handleDeleteClick = async () => {
    const [_, error] = await deletePost(postId);
    if (error) {
      setOpen(false);
      setHasError(true);
      setErrors(error);
      return;
    }

    props.history.push('/me');
  }

  const handleClickOpen = async () => {
    setOpen(true);
  }

  const handleClose = async () => {
    setOpen(false);
  }

  return (
    <MainLayout loading={loading}>
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

          <Card>
            <CardHeader
              title={title}
            />

            <CardMedia sx={{ marginY: 2, padding: 1 }}>
              <img src={file} className={classes.image} />
            </CardMedia>

            <CardContent sx={{ marginY: 2, padding: 1 }}>
              <Typography variant='h5'>
                {body}
              </Typography>
            </CardContent>

            <CardActions sx={{justifyContent: 'center'}}>
              {
                Auth.auth() && Auth.getUser()._id == userId ? (
                  <div>
                    <IconButton aria-label="add to shopping cart" onClick={handleLikeClick}>
                      <Link href={editUrl}>
                        <Edit sx={{ color: pink[500] }} />
                      </Link>
                    </IconButton>

                    <IconButton  aria-label="add to shopping cart" onClick={handleClickOpen}>
                      <Link>
                        <Delete sx={{ color: pink[500] }}/>
                      </Link>
                    </IconButton>

                    <AlertDialog
                      title={formatMessage({ id: 'post.delete.title' })}
                      body={formatMessage({ id: 'post.delete.body' })}
                      open={open}
                      handleAgree={handleDeleteClick}
                      handleClose={handleClose}
                    />
                  </div>
                ) : ''
              }
              {numberOfLikes || 0}
              <IconButton color="primary" aria-label="add to shopping cart" onClick={handleLikeClick}>
                {
                  liked ? <ThumbUp /> : <ThumbUpOutlined />
                }
              </IconButton>
            </CardActions>
          </Card>
        </Paper>
      </Container>
    </MainLayout>
  )
}
