import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isSignedIn } from './authService';
import AuthPage from '../Components/Common/AuthPage/AuthPage';


const AuthenticatedRoute = () => {

    const isAuthenticated = isSignedIn();
    const location = useLocation()
    
    console.log(isAuthenticated)

    if(isAuthenticated)
    {
        return <Outlet /> 
    }
    else
    return <Navigate to="/login" state={{ intendedDestination: location.pathname }} />;

};

export default AuthenticatedRoute;