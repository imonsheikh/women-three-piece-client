import React, { useEffect } from "react";
import SocialLogin from "../../components/SocialLogin/SocialLogin.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";
import Swal from "sweetalert2/src/sweetalert2.js";

const Login2 = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])  

  const {signIn, setLoading} = useAuth()
  const navigate = useNavigate() 
  const location = useLocation()
  console.log(location);
  
  // const from = location.state?.from?.pathname || "/" 
  const from =  "/" 
  console.log('Want to go location', location.state); 


  const handleLogin = (e) => {
     e.preventDefault() 

     const form = e.target 
     const email = form.email.value 
     const password = form.password.value  
     console.log(email, password);  


     //Call signIn
     signIn(email, password)
     .then(result => {
       console.log(result);
      Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Login Successful",
                 showConfirmButton: false,
                 timer: 1500
               });
       navigate(from, { replace: true });
       setLoading(false); // Stop loading on success
     })
     .catch(error => {
       console.error(error);
       Swal.fire({
         title: "Login Failed",
         text: error.message,
         icon: "error"
       });
       setLoading(false); // Stop loading on error
     });
  }

  return (
    <div
      className="bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1951&q=80)",
      }}
    >
      <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
      <div className="lg:min-h-[calc(100vh-103px)] min-h-[calc(100vh-55px)] flex flex-col sm:flex sm:flex-row mx-0 justify-center px-2">
        {/* Left Side */}
        <div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
          <div className="self-start hidden lg:flex flex-col text-white">
            <img src="" alt="Logo" className="mb-3" />
            <h1 className="mb-3 font-bold sm:text-5xl text-2xl">Hi! Welcome Back Aji</h1>
            <p className="pr-3">
              Lorem ipsum is placeholder text commonly used in the graphic, print,
              and publishing industries for previewing layouts and visual mockups.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center md:self-center z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">Log In</h3>
              <p className="text-gray-500">Please sign in to your account.</p>
            </div> 
            <SocialLogin></SocialLogin> 
            <div className="divider">OR</div>
            <form 
            onSubmit={handleLogin}
            className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Email
                </label>
                <input
                  className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="email"
                  name="email"
                  placeholder="yourgmail@gmail.com"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                  Password
                </label>
                <input
                  className="w-full content-center text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                />
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-gray-800"
                  >
                    Remember me
                  </label> */}
                </div>
                <div className="text-sm">
                  <Link
                    to=''
                    className="text-green-400 hover:text-green-500 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              {/* Sign In Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-primary-c hover:bg-green-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="text-[14px] text-center mt-2">
                <p>New Here? <Link to='/register' className="underline font-bold text-md text-primary-c ml-">Register</Link></p>
              </div>
            {/* Footer */}
            <div className="pt-5 text-center text-gray-400 text-xs"> 
             
      
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login2;