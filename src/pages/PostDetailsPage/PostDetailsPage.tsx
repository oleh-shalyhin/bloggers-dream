import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CommentList, PostDetails } from '../../components';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPostAuthor, fetchSinglePost, selectDetailedPost } from '../../store/detailedPostSlice';
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
  }, [fetchDetailedPost]);

  return post.data ? (
    <Stack spacing={4}>
      <PostDetails post={post.data} />
      <CommentList />
    </Stack>
  ) : null;
}
