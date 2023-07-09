import { render, screen } from '@testing-library/react';
import { ChipList } from './ChipList';
import { postCardTag } from '../../constants/testIds';

test('renders list of chips', async () => {
  const tags = ['tag1', 'tag2', 'tag3'];
  render(<ChipList tags={tags} />);

  expect(screen.getAllByTestId(postCardTag)).toHaveLength(tags.length);
  tags.forEach((tag) => expect(screen.getByText(tag)).toBeInTheDocument());
});

test('renders nothing when empty list passed', async () => {
  const tags: string[] = [];
  render(<ChipList tags={tags} />);

  expect(screen.queryAllByTestId(postCardTag)).toHaveLength(0);
});
