// ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getCurrentUser } from '../../services/authService';
import { LoadingPage } from '../../pages/LoadingPage';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);


  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await getCurrentUser();
      setIsAuthenticated(isAuth);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) {
    // Show a loading spinner or a placeholder while checking the authentication state
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;