import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

test('renders error message', async () => {
  render(<ErrorMessage message="Test error" />);
  expect(screen.getByText(/test error/i)).toBeInTheDocument();
});
