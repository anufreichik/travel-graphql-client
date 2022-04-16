import React, { useContext } from 'react';
import {Navigate, useLocation} from 'react-router-dom';

import { AuthContext } from '../context/authContext';

function AuthRoute({  children}) {
    const location = useLocation();
    const { user } = useContext(AuthContext);


    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}

export default AuthRoute;
