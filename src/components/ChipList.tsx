import { Box, Chip, useTheme } from '@mui/material';
import { postCardTag } from '../constants/testIds';

interface ChipListProps {
  tags: string[];
}

export function ChipList({ tags }: ChipListProps) {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', gap: theme.spacing(2) }}>
      {tags.map((tag) => (
        <Chip key={tag} data-testid={postCardTag} label={tag} />
      ))}
    </Box>
  );
}
