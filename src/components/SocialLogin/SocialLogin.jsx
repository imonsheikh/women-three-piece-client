import React from 'react';
import useAuth from '../../hooks/useAuth.jsx';
import { useNavigate } from 'react-router-dom';
import Swal from './../../../node_modules/sweetalert2/src/sweetalert2';

const SocialLogin = () => {  
    const {googleSignIn} = useAuth()
    const navigate = useNavigate() 
    
    const handleGoogleSignIn = () => {
      googleSignIn()
        .then(result => {
          console.log('socialLogin', result.user);
          navigate('/');
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(error => {
          console.error('google login error', error);
    
          // Default error message
          let errorMessage = "Login failed. Please try again.";
    
          // Handle specific Firebase error codes
          if (error.code === "auth/network-request-failed") {
            errorMessage = "No internet connection. Please check your network!";
          } else if (error.code === "auth/cancelled-popup-request") {
            errorMessage = "You closed the popup too soon. Please try again.";
          } else if (error.code === "auth/popup-closed-by-user") {
            errorMessage = "Login cancelled. You need to allow popups.";
          } else if (error.code === "auth/user-not-found") {
            errorMessage = "No user found with this email.";
          } else if (error.code === "auth/wrong-password") {
            errorMessage = "Incorrect password. Please try again.";
          }
    
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: errorMessage
          });
        });
    };
    
    return (
        <div className='my-2'>
           <button
  onClick={handleGoogleSignIn}
  className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-800 shadow-md transition-all duration-300 hover:border-gray-400 hover:bg-gray-100 hover:shadow-lg focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="Google"
    className="h-5 w-5"
  />
  <span className="text-base font-semibold">Continue with Google</span>
</button>

        </div>
    );
};

export default SocialLogin;