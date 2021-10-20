import { useState } from 'react';
import { CircularProgress, Grid } from '@mui/material';
import axios from 'axios';
import { MainLayout } from '../layouts'
import { useEffect } from 'react';
import { Post, NoPost } from '../components';

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
      <MainLayout>
        {
          posts.length > 0
            ? <Grid container spacing={2}>
              {
                posts.map(p => (
                  <Grid item xs={12} md={6} lg={4}  key={p.img}>
                    <Post title={p.title} image={p.image} body={p.body} postId={p._id} />
                  </Grid>
                ))
              }
            </Grid>
            :
           <NoPost message='post.noPosts'/>
        }

      </MainLayout>
    )

  return render;
}