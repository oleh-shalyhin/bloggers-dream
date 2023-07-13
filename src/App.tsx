import { Box, Container, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink, Outlet } from 'react-router-dom';

function App() {
  return (
    <Container maxWidth="md" sx={{ my: 5 }}>
      <Stack alignItems="center" spacing={6}>
        <Box component="header">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold' }}>
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
