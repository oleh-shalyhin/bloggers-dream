import { render, screen } from '@testing-library/react';
import React from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { postCardTruncateWordsAmount } from '../../constants/constants';
import { postCardReactionsAmount, postCardTag } from '../../constants/testIds';
import { postsResponseMock } from '../../mocks';
import { truncateTextByWords } from '../../utils/utils';
import { PostCard } from './PostCard';

const post = postsResponseMock.posts[0];
let postCardComponent: React.ReactElement;

beforeEach(() => {
  const routes = [
    {
      path: '/',
      element: <PostCard post={post} />,
    },
  ];
  const router = createMemoryRouter(routes, { initialEntries: ['/'] });
  postCardComponent = <RouterProvider router={router} />;
});

test('renders single post', async () => {
  const truncatedPostBody = `${truncateTextByWords(post.body, postCardTruncateWordsAmount)}...`;
  render(postCardComponent);

  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(post.title);
  expect(screen.getByText(truncatedPostBody)).toBeInTheDocument();
  expect(screen.getByTestId(postCardReactionsAmount)).toHaveTextContent(`${post.reactions}`);
  expect(screen.getByRole('link', { name: /read more/i })).toHaveAttribute('href', `/posts/${post.id}`);

  const tagElements = screen.getAllByTestId(postCardTag);
  expect(tagElements).toHaveLength(post.tags.length);
  tagElements.forEach((tagElement, j) => {
    expect(tagElement).toHaveTextContent(post.tags[j]);
  });
});
