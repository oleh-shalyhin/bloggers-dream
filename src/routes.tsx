import App from './App';
import PostsPage from './pages/PostsPage';
import PostDetailsPage from './pages/PostDetailsPage';

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
