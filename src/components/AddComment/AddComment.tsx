import { Box, Button, Stack, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { addPostCommentFailedMessage } from '../../constants/constants';
import { useAppDispatch } from '../../store/hooks';
import { addNewComment } from '../../store/slices';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

interface AddCommentProps {
  postId: number;
}

export function AddComment({ postId }: AddCommentProps) {
  const [comment, setComment] = useState('');
  const [addCommentError, setAddCommentError] = useState(false);
  const dispatch = useAppDispatch();

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const addComment = async (event: FormEvent) => {
    event.preventDefault();

    try {
      // userId is hardcoded here until authentication is added to the project
      await dispatch(addNewComment({ postId, userId: 1, body: comment })).unwrap();
      setComment('');
      setAddCommentError(false);
    } catch (error) {
      setAddCommentError(true);
    }
  };

  return (
    <Stack component="form" onSubmit={addComment} spacing={1}>
      <TextField
        id="post-comment-input"
        label="Add a comment..."
        multiline
        maxRows={3}
        value={comment}
        onChange={handleCommentChange}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" type="submit">
          Comment
        </Button>
      </Box>
      {addCommentError ? (
        <Box sx={{ py: 1 }}>
          <ErrorMessage message={addPostCommentFailedMessage} />
        </Box>
      ) : null}
    </Stack>
  );
}
