import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from './../firebase/firebase.config';
import useAxiosPublic from './../hooks/useAxiosPublic';

export const AuthContext = createContext(null)
 
const AuthProviders = ({children}) => {   
   const [user, setUser] = useState(null) 
   const [loading, setLoading] = useState(true) 
   const googleProvider = new GoogleAuthProvider()

   const axiosPublic = useAxiosPublic('')
   
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
  //3.Create User with email and password
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }
  // 4.SignIn User with email and password 
  const signIn = (email, password)=> {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  } 
  //5. Update Profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {displayName: name, photoURL: photo})
  }  




   useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser) 
        if(currentUser){
          const userInfo = {email: currentUser.email}
          axiosPublic.post('/jwt', userInfo)
          .then(res => {
            // console.log(res.data.token,'I am here');
            if(res.data.token){
              localStorage.setItem('access-token', res.data.token)
              setLoading(false)
            }
          })
          .catch(error => {
            console.log('Token error', error);
          })
        }else{
          localStorage.removeItem('access-token')
          setLoading(false)
        }
      })  

      return () => {
        unsubscribe()
      }
   }, [axiosPublic])

   const userInfo = {
    googleProvider,
    user,
    setUser,
    loading,
    googleSignIn,
    logOut,
    createUser,
    signIn,
    updateUserProfile

   }


    return (
       <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProviders;