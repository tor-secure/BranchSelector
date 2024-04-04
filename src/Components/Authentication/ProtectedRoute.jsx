// ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from './authStore';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, initAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = initAuth();
    return unsubscribe;
  }, [initAuth]);

  if (isLoading) {
    // Show a loading spinner or a placeholder while checking the authentication state
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;