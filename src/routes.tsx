import App from './App';
import { PostDetailsPage, PostsPage } from './pages';

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
    ],
  },
];

export default routes;
