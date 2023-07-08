import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import routes from './routes';

const router = createMemoryRouter(routes, { initialEntries: ['/'] });
const appComponent = <RouterProvider router={router} />;

test('navigates between PostsPage and PostDetailsPage', async () => {
  render(appComponent);
  expect(await screen.findByText(/posts page/i)).toBeInTheDocument();
  expect(screen.queryByText(/post details page/i)).not.toBeInTheDocument();

  await userEvent.click(screen.getByText(/read more/i));
  expect(await screen.findByText(/post details page/i)).toBeInTheDocument();
  expect(screen.queryByText(/posts page/i)).not.toBeInTheDocument();

  await userEvent.click(screen.getByText(/blogger's dream/i));
  expect(await screen.findByText(/posts page/i)).toBeInTheDocument();
  expect(screen.queryByText(/post details page/i)).not.toBeInTheDocument();
});
