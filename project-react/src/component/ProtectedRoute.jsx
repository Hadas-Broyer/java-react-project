import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, } from 'react-router-dom';

const ProtectedRoute = ({ element}) => {
  const user = localStorage.getItem('user');
  if (user==null) {
    return <Navigate to="/Login" replace />;
  }
  return element;
};

export default ProtectedRoute;