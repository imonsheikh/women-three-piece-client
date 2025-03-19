import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProviders.jsx';

const useAuth = () => {
 const auth = useContext(AuthContext)
 return auth  
};

export default useAuth;