import { Link, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

function PostsPage() {
  return (
    <>
      <Typography variant="h5" component="h2">
        Posts page
      </Typography>
      <Link component={RouterLink} to={'/posts/1'}>
        Read more
      </Link>
    </>
  );
}

export default PostsPage;
