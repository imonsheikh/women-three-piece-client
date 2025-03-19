import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from './../firebase/firebase.config';

export const AuthContext = createContext(null)
 
const AuthProviders = ({children}) => {   
   const [user, setUser] = useState(null) 
   const [loading, setLoading] = useState(true) 
   
   const googleProvider = new GoogleAuthProvider()
   
   //1.Google sign In  
   const googleSignIn = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
   }
  //2. LogOut 
  const logOut = () => {
    setLoading(true)
    return signOut(auth) 

  }  

   useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser) 

      })  

      return () => {
        unsubscribe()
      }
   }, [])

   const userInfo = {
    googleProvider,
    user,
    setUser,
    loading,
    googleSignIn,
    logOut,

   }


    return (
       <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProviders;