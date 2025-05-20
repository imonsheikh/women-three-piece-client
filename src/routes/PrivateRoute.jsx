import React from 'react';
import useAuth from '../hooks/useAuth.jsx';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading/Loading.jsx';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()
    const location = useLocation()
    console.log(location);
    
    if(loading){
        return <Loading></Loading>
    }

    if(user){
        return children
    }

    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;  

