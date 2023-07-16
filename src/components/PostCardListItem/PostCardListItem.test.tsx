import { screen } from '@testing-library/react';
import { postCardTruncateWordsAmount } from '../../constants/constants';
import { postCardReactionsAmount, postCardTag } from '../../constants/testIds';
import { postsResponseMock } from '../../mocks/mocks';
import { renderWithProviders } from '../../utils/testUtils';
import { truncateTextByWords } from '../../utils/utils';
import { PostCardListItem } from './PostCardListItem';

const post = postsResponseMock.posts[0];

test('renders single post card', () => {
  const truncatedPostBody = `${truncateTextByWords(post.body, postCardTruncateWordsAmount)}...`;
  renderWithProviders(<PostCardListItem post={post} />);

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
