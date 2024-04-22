import React from "react";
import { Route, Navigate } from "react-router-dom";
import {useAuth} from './contexts/AuthContext';

const PrivateRoute = ({ Component }) => 
{
  const { currentUser } = useAuth() 

  return currentUser ? <Component /> 
    : <Navigate to="/login" replace /> ;
    // <Route
    //   {...rest}
    //   element = {currentUser ? 
    //     <Component /> 
    //    : null
    //     // <Navigate to="/login" replace />
    // }
    // />
};

export default PrivateRoute