import React from 'react';
import { Link, Paper, Card } from '@mui/material';

export default function Post({ image, title, body, variant = 'filled', postId = '#', numberofLikes=0, ...props }) {
  return (
    <Paper>
      <h4>{title}</h4>
      <Link href={`/posts/${postId}/view`} >
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
          srcSet={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
          alt={title}
          loading="lazy"
          height={320}
          width={320}
        />
      </Link>
      <Card>
        <p>{body}</p>
        <p>{numberofLikes}</p>
      </Card>
    </Paper>
  );
}