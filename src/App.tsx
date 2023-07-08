import { Link, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';

function App() {
  return (
    <Stack alignItems="center" spacing={2}>
      <Typography variant="h2" component="h1">
        <Link component={RouterLink} to={'/'} underline="none">
          Blogger's Dream
        </Link>
      </Typography>
      <Outlet />
    </Stack>
  );
}

export default App;
