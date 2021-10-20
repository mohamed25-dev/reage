import React from 'react';
import { Card, CardHeader, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

export default function Post({ image, title, body, variant = 'filled', postId = '#', numberofLikes = 0, ...props }) {
  return (
    <Card 
      sx={{ marginBottom: 2, textDecoration: 'none' }} 
      component={Link} 
      to={`/posts/${postId}/view`}
      >
      <CardHeader
        title={title}
      />
      <CardMedia component='img'
        src={`${process.env.REACT_APP_IMAGE_URL}/${image}`}
        srcSet={`${process.env.REACT_APP_IMAGE_URL}/${image}`}
        alt={title}
        loading="lazy"
        height={320}
        width={320}
      />
      <CardContent>
        <Typography>
          {body.substr(0, 40)}
        </Typography>
      </CardContent>
    </Card>
  );
}