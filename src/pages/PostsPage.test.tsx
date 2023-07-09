import { render, screen, within } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { postCardTruncateWordsAmount } from '../constants/constants';
import { postCard, postCardReactionsAmount, postCardTag } from '../constants/testIds';
import { postsResponseMock } from '../mocks';
import routes from '../routes';
import { truncateTextByWords } from '../utils/utils';

const router = createMemoryRouter(routes, { initialEntries: ['/'] });
const appComponent = <RouterProvider router={router} />;

test('renders list of posts', async () => {
  render(appComponent);
  expect(screen.getAllByTestId(postCard)).toHaveLength(postsResponseMock.posts.length);

  postsResponseMock.posts.forEach((post, i) => {
    const postElement = within(screen.getAllByTestId(postCard)[i]);
    const truncatedPostBody = `${truncateTextByWords(post.body, postCardTruncateWordsAmount)}...`;

    expect(postElement.getByRole('heading', { level: 2 })).toHaveTextContent(post.title);
    expect(postElement.getByText(truncatedPostBody)).toBeInTheDocument();
    expect(postElement.getByTestId(postCardReactionsAmount)).toHaveTextContent(`${post.reactions}`);
    expect(postElement.getByRole('link', { name: /read more/i })).toHaveAttribute('href', `/posts/${post.id}`);

    const tagElements = postElement.getAllByTestId(postCardTag);
    expect(tagElements).toHaveLength(post.tags.length);
    tagElements.forEach((tagElement, j) => {
      expect(tagElement).toHaveTextContent(post.tags[j]);
    });
  });
});
