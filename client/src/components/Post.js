import React from 'react';
import { Card, CardHeader, CardContent, CardActions, CardMedia, Box } from '@mui/material';
import {Link} from 'react-router-dom';

export default function Post({ image, title, body, variant = 'filled', postId = '#', numberofLikes = 0, ...props }) {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardHeader  
        title={title}
      />
      <CardMedia>
        <Box component={Link} to={`/posts/${postId}/view`} >
          <img
            src={`${process.env.REACT_APP_IMAGE_URL}/${image}`}
            srcSet={`${process.env.REACT_APP_IMAGE_URL}/${image}`}
            alt={title}
            loading="lazy"
            height={320}
            width={320}
          />
        </Box>
      </CardMedia>
      <CardContent>
        <p>{body.substr(0, 40)}</p>
      </CardContent>
    </Card>
  );
}