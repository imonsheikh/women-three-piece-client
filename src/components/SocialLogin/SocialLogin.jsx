import React from 'react';
import useAuth from '../../hooks/useAuth.jsx';

const SocialLogin = () => {  
    const {googleSignIn} = useAuth() 
    
    const handleGoogleSignIn = () => { 
        console.log('cli');
        
        googleSignIn()
        .then(result => {
            console.log('socialLogin', result.user); 
            
        })
    }

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