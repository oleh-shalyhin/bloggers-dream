import { Stack } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CommentList, PostDetails } from '../../components';
import { fetchPostAuthor, fetchSinglePost, reset, selectDetailedPost } from '../../store/detailedPostSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Post } from '../../types/types';

export function PostDetailsPage() {
  const { postId } = useParams();
  const post = useAppSelector(selectDetailedPost);
  const dispatch = useAppDispatch();

  const fetchDetailedPost = useCallback(async () => {
    if (!postId) {
      return;
    }

    try {
      const newPost: Post = await dispatch(fetchSinglePost(+postId)).unwrap();
      await dispatch(fetchPostAuthor(newPost.userId)).unwrap();
    } catch (error) {
      console.error('Failed to load post');
    }
  }, [postId, dispatch]);

  useEffect(() => {
    fetchDetailedPost();

    return () => {
      dispatch(reset());
    };
  }, [fetchDetailedPost]);

  return post.data ? (
    <Stack spacing={4}>
      <PostDetails post={post.data} />
      <CommentList />
    </Stack>
  ) : null;
}
