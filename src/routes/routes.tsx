import App from '../App';
import { ErrorPage, PostDetailsPage, PostsPage } from '../pages';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <PostsPage />,
      },
      {
        path: '/posts/:postId',
        element: <PostDetailsPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
];

export default routes;
