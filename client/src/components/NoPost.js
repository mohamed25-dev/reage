import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Add } from '@mui/icons-material';

export default function NoPost({message}) {
  return (
    <Box style={{ alignItems: 'center', margin: 32 }}>
      <Typography variant='h5'>
        <FormattedMessage id={message} />
      </Typography>

      <Button
        variant='outlined'
        color='primary'
        component={Link} to='/posts/add'
        sx={{ marginY: 4 }}
        endIcon={<Add />}
      >
        <FormattedMessage id='post.add' />
      </Button>
    </Box>
  );
}