import React from 'react';
import { Link, Card, CardHeader, CardContent, CardActions, CardMedia } from '@mui/material';

export default function Post({ image, title, body, variant = 'filled', postId = '#', numberofLikes = 0, ...props }) {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardHeader  
        title={title}
      />
      <CardMedia>
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
      </CardMedia>
      <CardContent>
        <p>{body.substr(0, 40)}</p>
      </CardContent>
    </Card>
  );
}