import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <h1>
        <Link to={'/'}>Blogger's Dream</Link>
      </h1>
      <Outlet />
    </>
  );
}

export default App;
