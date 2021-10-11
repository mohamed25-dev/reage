import { useState } from 'react';
import {CircularProgress, Grid } from '@material-ui/core';
import axios from 'axios';
import { MainLayout } from '../layouts'
import { useEffect } from 'react';
import { Post } from '../components';
import Auth from '../Auth';

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
      <MainLayout title='title.myPosts'>
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