import { Box, Chip } from '@mui/material';
import { postCardTag } from '../../constants/testIds';

interface ChipListProps {
  tags: string[];
}

export function ChipList({ tags }: ChipListProps) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {tags.map((tag) => (
        <Chip key={tag} data-testid={postCardTag} label={tag} />
      ))}
    </Box>
  );
}
