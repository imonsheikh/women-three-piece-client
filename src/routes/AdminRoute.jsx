import React from 'react';
import useAuth from '../hooks/useAuth.jsx';
import useAdmin from '../hooks/useAdmin.jsx';
import { useLocation, Navigate } from 'react-router-dom';
import Loading from '../components/Loading/Loading.jsx';

const AdminRoute = ({children}) => {  
    const [user, loading] = useAuth() 
    const [isAdmin, isAdminLoading] = useAdmin(); 
    const location = useLocation() 

    if(loading || isAdminLoading) {
        return <Loading/>
    }  

    if(user && isAdmin) {
        return children
    }  

    return <Navigate to="/" state={{from: location}} replace></Navigate>
 
};

export default AdminRoute;