import { Container, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink, Outlet } from 'react-router-dom';

function App() {
  return (
    <Container maxWidth="md">
      <Stack alignItems="center" spacing={4}>
        <Typography variant="h2" component="h1">
          <Link component={RouterLink} to={'/'} underline="none">
            Blogger's Dream
          </Link>
        </Typography>
        <Outlet />
      </Stack>
    </Container>
  );
}

export default App;
