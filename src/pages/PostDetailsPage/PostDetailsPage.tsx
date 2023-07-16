import { Box, Button, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentList, ErrorMessage, Loader, PostDetails } from '../../components';
import { singlePostLoadingFailedMessage } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchSinglePost, postDetailsClosed, selectPostById } from '../../store/slices';

export function PostDetailsPage() {
  const navigate = useNavigate();
  const { postId: postIdParam } = useParams();
  const postId = postIdParam ? parseInt(postIdParam) : undefined;
  const post = useAppSelector((state) => selectPostById(state, postId));
  const status = useAppSelector((state) => state.posts.singlePostRequestStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (postId !== undefined) {
      dispatch(fetchSinglePost(postId));
    }

    return () => {
      dispatch(postDetailsClosed());
    };
  }, [dispatch, postId]);

  const renderPostDetails = () => {
    if (postId === undefined || !post) {
      return null;
    }

    return (
      <Stack spacing={4}>
        <Box>
          <Button onClick={() => navigate(-1)}>&lt;&lt; Back to posts</Button>
        </Box>
        <PostDetails post={post} />
        <CommentList postId={postId} />
      </Stack>
    );
  };

  const renderContent = () => {
    let content = null;

    if (status === 'loading') {
      content = <Loader />;
    } else if (status === 'succeeded') {
      content = renderPostDetails();
    } else if (status === 'failed') {
      content = <ErrorMessage message={singlePostLoadingFailedMessage} />;
    }

    return content;
  };

  return <Stack sx={{ alignItems: 'center', width: '100%' }}>{renderContent()}</Stack>;
}
