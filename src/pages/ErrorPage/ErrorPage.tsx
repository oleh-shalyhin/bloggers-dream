import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Stack, Typography } from '@mui/material';

export function ErrorPage() {
  return (
    <Stack alignItems="center" sx={{ width: '100%', gap: 8 }}>
      <Typography variant="h3" component="h2">
        Oops!
      </Typography>
      <ReportProblemIcon color="error" sx={{ fontSize: 180 }} />
      <Typography variant="body1">The page you were looking for is not found.</Typography>
    </Stack>
  );
}
