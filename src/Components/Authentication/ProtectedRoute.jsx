import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getCurrentUser } from '../../services/authService';
import { LoadingPage } from '../../pages/LoadingPage';

const ProtectedRoute = ({ children }) => {

  // This special routing component is used to stop users from accessing certain routes without logging in.
  // Example: User Dashboard

  // This compoenent works by wrapping it around the children of the routes we want to protect.
  // Used in the main.jsx file

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {

    // Essentially listening to logout changes. If user is a protected route and logs out, the state changes 
    // and the login page is displayed again.

    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);


  useEffect(() => {

    // Check current auth state.

    const checkAuth = async () => {
      const isAuth = await getCurrentUser();
      setIsAuthenticated(isAuth);
      setIsLoading(false);
    };
    checkAuth();
  }, []);


  // Show loading page while authentication is taking place.
  if (isLoading) {
    return <LoadingPage />;
  }

  
  //If not authenticated, go to login page. Send current location as state so that after login, user can be redirected
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated do noting
  return children;
};

export default ProtectedRoute;