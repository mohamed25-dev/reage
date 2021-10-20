import { useState } from 'react';
import { Button, CircularProgress, Grid, Typography, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import axios from 'axios';
import { MainLayout } from '../layouts'
import { useEffect } from 'react';
import { Post, NoPost } from '../components';
import Auth from '../Auth';
import { FormattedMessage } from 'react-intl';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Auth.init();
    init();
  }, []);

  useEffect(() => {
  }, [loading]);

  const init = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts/me`);

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
      <MainLayout>
        {
          posts.length > 0
            ?
            <Grid container spacing={2}>
              {
                posts.map(p => (
                  <Grid item xs={12} md={6} lg={4}  key={p.img}>
                    <Post title={p.title} image={p.image} body={p.body} postId={p._id} />
                  </Grid>
                ))
              }
            </Grid>
            :
            <NoPost message='post.profileNoPosts'/>
        }
      </MainLayout>
    )

  return render;
}