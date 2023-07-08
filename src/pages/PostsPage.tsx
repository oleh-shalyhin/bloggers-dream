import React from 'react';
import { Link } from 'react-router-dom';

function PostsPage() {
  return (
    <>
      <h2>Posts page</h2>
      <Link to={'/posts/1'}>Read more</Link>
    </>
  );
}

export default PostsPage;
