// ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from './authStore';
import { LoadingPage } from '../../pages/LoadingPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, initAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = initAuth();
    return unsubscribe;
  }, [initAuth]);

  if (isLoading) {
    // Show a loading spinner or a placeholder while checking the authentication state
    return <LoadingPage/>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;