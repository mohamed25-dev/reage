import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { CircularProgress, Grid, Button, Container, Fab, Pagination } from '@mui/material';
import { Add } from '@mui/icons-material';
import axios from 'axios';
import { MainLayout } from '../layouts'
import { useEffect } from 'react';
import { Post, NoPost, Paginate } from '../components';

export default function Home(props) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [postsCount, setPostsCount] = useState(0);

  const loadPage = async ({p = 1}) => {
    try {
      setLoading(true);
      const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts?p=${p}`);
      setPostsCount(result.data.count);
      setPosts(result.data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
  }, [loading]);

  useEffect(() => {
    loadPage({p: page});
  }, [page]);

  const init = async () => {
    const search = props.location.search;
    const params = new URLSearchParams(search);
    let p = parseInt(params.get('p'));

    await loadPage({p});
  }

  const render = loading
    ? <CircularProgress />
    : (
      <MainLayout>

        {
          posts.length > 0
            ?
            (
              <Container>
                <Fab color="primary" aria-label="أضف منشورا" sx={{
                  position: 'fixed',
                  bottom: 16,
                  left: 16,
                }}>
                  <Add />
                </Fab>
                <Grid container columnSpacing={1} rowSpacing={1}>
                  {
                    posts.map(p => (
                      <Grid item xs={12} md={6} lg={4} key={p.img}>
                        <Post title={p.title} image={p.image} body={p.body} postId={p._id} />
                      </Grid>
                    ))
                  }
                </Grid>
              </Container>
            )
            :
            <NoPost message='post.noPosts' />

        }

        <Paginate count={postsCount} page={page} props={props} onChange={(e, p) => setPage(p)}/>
      </MainLayout>
    )

  return render;
}