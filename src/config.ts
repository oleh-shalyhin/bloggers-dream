const config = {
  baseUrl: 'https://dummyjson.com',
  endpoints: {
    posts: '/posts',
    postById: '/posts/:postId',
    userById: '/users/:userId',
    commentsByPostId: '/comments/post/:postId',
    addPostComment: '/comments/add',
  },
};

export default config;
