import { Box, Container, Link, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink, Outlet } from 'react-router-dom';

function App() {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.down('md'));
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const headerVariant = mobile ? 'h5' : tablet ? 'h3' : 'h2';

  return (
    <Container maxWidth="md" sx={{ my: 5 }}>
      <Stack alignItems="center" spacing={6}>
        <Box component="header">
          <Typography variant={headerVariant} component="h1" sx={{ fontWeight: 'bold' }}>
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
