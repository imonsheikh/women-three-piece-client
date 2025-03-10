import React, { createContext } from 'react';

export const AuthContext = createContext(null)
 
const AuthProviders = ({children}) => {  
    return (
       <AuthContext.Provider>{children}</AuthContext.Provider>
    );
};

export default AuthProviders;