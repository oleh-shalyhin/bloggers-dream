import { Stack } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CommentList, PostDetails } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchSinglePost, selectPostById } from '../../store/postsSlice';

export function PostDetailsPage() {
  const { postId } = useParams();
  const post = useAppSelector((state) => selectPostById(state, postId as string));
  const dispatch = useAppDispatch();

  const getPost = useCallback(async () => {
    if (!postId) {
      return;
    }

    try {
      await dispatch(fetchSinglePost(+postId)).unwrap();
    } catch (error) {
      console.error('Failed to load post');
    }
  }, [postId, dispatch]);

  useEffect(() => {
    getPost();
  }, [dispatch, getPost]);

  if (!post || !postId) {
    return null;
  }

  return (
    <Stack spacing={4}>
      <PostDetails post={post} />
      <CommentList postId={+postId} />
    </Stack>
  );
}
