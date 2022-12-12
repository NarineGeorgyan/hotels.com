import React from 'react';
import Loader from '../components/Loader';

const Error = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-85">
      <div className="text-center">
        <h2 className="h1">404</h2>
        <h2 className="h1">❌</h2>
        <p className="text-muted">Page is not found!</p>
      </div>
      <Loader />
    </div>
  );
};

export default Error;
