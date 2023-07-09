import { Box, Typography, useTheme } from '@mui/material';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { postCardReactionsAmount } from '../../constants/testIds';

interface ReactionsCounterProps {
  amount: number;
}

export function ReactionsCounter({ amount }: ReactionsCounterProps) {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', gap: theme.spacing(2) }}>
      <CommentOutlinedIcon />
      <Typography data-testid={postCardReactionsAmount} variant="body1">
        {amount}
      </Typography>
    </Box>
  );
}
