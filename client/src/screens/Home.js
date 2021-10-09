import { useState } from 'react';
import { makeStyles, Box, CircularProgress, Grid } from '@material-ui/core';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import { MainLayout } from '../layouts'
import { useEffect } from 'react';
import { Post } from '../components';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    },

    title: {
      padding: theme.spacing(2),
      background: theme.palette.background.title
    },

    continer: {
      flexGrow: 1,
      display: 'flex',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.primary.main,
      background: '#fff'
    },
    content: {
      flexGrow: 1,
      borderBottom: 'none',
    }
  }
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
  }, [loading]);

  const init = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts`);
      console.log(result.data);
      setPosts(result.data.posts)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  const render = loading
    ? <CircularProgress />
    : (
      <MainLayout title='Home Page'>
        <Grid container spacing={2}>
          {
            posts.map(p => (
              <Grid item xs={4} key={p.img}>
                <Post title={p.title} image={p.image} body={p.body} />
              </Grid>
            ))
          }
        </Grid>
      </MainLayout>
    )

  return render;
}