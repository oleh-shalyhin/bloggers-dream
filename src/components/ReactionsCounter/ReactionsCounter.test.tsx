import { render, screen } from '@testing-library/react';
import { ReactionsCounter } from './ReactionsCounter';
import { postCardReactionsAmount, postCardReactionsIcon } from '../../constants/testIds';

test('renders reactions counter', async () => {
  const amount = 5;
  render(<ReactionsCounter amount={amount} />);

  expect(screen.getByTestId(postCardReactionsIcon)).toBeInTheDocument();
  expect(screen.getByTestId(postCardReactionsAmount)).toHaveTextContent(`${amount}`);
});
