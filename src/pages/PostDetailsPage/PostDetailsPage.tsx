import { Stack } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CommentList, ErrorMessage, Loader, PostDetails } from '../../components';
import { singlePostLoadingFailedMessage } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchSinglePost, postDetailsClosed, selectPostById } from '../../store/slices';

export function PostDetailsPage() {
  const { postId } = useParams();
  const post = useAppSelector((state) => selectPostById(state, postId as string));
  const { status: postRequestStatus, error: postRequestError } = useAppSelector(
    (state) => state.posts.singlePostRequestStatus,
  );
  const dispatch = useAppDispatch();

  const getPost = useCallback(async () => {
    if (postId) {
      dispatch(fetchSinglePost(+postId));
    }
  }, [postId, dispatch]);

  useEffect(() => {
    getPost();

    return () => {
      dispatch(postDetailsClosed());
    };
  }, [dispatch, getPost]);

  const renderPostDetails = () => {
    if (!postId || !post) {
      return null;
    }

    return (
      <Stack spacing={4}>
        <PostDetails post={post} />
        <CommentList postId={+postId} />
      </Stack>
    );
  };

  const renderContent = () => {
    let content = null;

    if (!postId) {
      content = null;
    } else if (postRequestStatus === 'loading') {
      content = <Loader />;
    } else if (postRequestStatus === 'succeeded') {
      content = renderPostDetails();
    } else if (postRequestStatus === 'failed' && postRequestError) {
      content = <ErrorMessage message={singlePostLoadingFailedMessage} />;
    }

    return content;
  };

  return <Stack sx={{ alignItems: 'center', width: '100%' }}>{renderContent()}</Stack>;
}
