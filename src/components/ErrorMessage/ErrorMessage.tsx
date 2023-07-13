import { Alert } from '@mui/material';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Alert severity="error" sx={{ width: '100%' }}>
      {message}
    </Alert>
  );
}
