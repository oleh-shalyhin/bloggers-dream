import { Box, Container, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink, Outlet } from 'react-router-dom';

function App() {
  return (
    <Container maxWidth="md">
      <Stack alignItems="center" spacing={4}>
        <Box component="header">
          <Typography variant="h2" component="h1">
            <Link component={RouterLink} to={'/'} underline="none">
              Blogger's Dream
            </Link>
          </Typography>
        </Box>
        <Box component="main">
          <Outlet />
        </Box>
      </Stack>
    </Container>
  );
}

export default App;
