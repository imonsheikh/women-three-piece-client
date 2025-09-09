import React, { useEffect, useState } from "react";
import SocialLogin from "../../components/SocialLogin/SocialLogin.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";
import Swal from "sweetalert2/src/sweetalert2.js";
import useAxiosPublic from "../../hooks/useAxiosPublic.jsx";
import RoleSelectorTwo from "../../components/RoleSelectorTwo.jsx";

const Login2 = () => {
  const axiosPublic = useAxiosPublic();
  const { signIn, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle Role Change (User/Admin)
  const handleRoleChange = (role) => {
    if (role === "admin") {
      setEmail("admin007@mail.com");
      setPassword("12345678Admin");
    } else if (role === "user") {
      setEmail("user007@mail.com");
      setPassword("12345678User");
    } else {
      setEmail("");
      setPassword("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await signIn(email, password);
      const loggedUser = result.user;

      //Take JWT token by axiosPublic
      const res = await axiosPublic.post("/jwt", { email: loggedUser.email });
      // Token Saving to localStorage
      localStorage.setItem("access-token", res.data.token);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      setLoading(false);
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Login Failed",
        text: error.message,
        icon: "error",
      });
      setLoading(false);
    }
  };

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
            <h1 className="mb-3 font-bold sm:text-5xl text-2xl">
              Hi! Welcome Back Aji
            </h1>
            <p className="pr-3">Welcome to Mehrab Fashion House</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center md:self-center z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100">
            {/* Role Selector */}
            <RoleSelectorTwo onChange={handleRoleChange} />

            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">Log In</h3>
              <p className="text-gray-500">Please sign in to your account.</p>
            </div>

            <SocialLogin />
            <div className="divider">OR</div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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
              <p>
                New Here?{" "}
                <Link
                  to="/register"
                  className="underline font-bold text-md text-primary-c ml-"
                >
                  Register
                </Link>
              </p>
            </div>

            {/* Footer */}
            <div className="pt-5 text-center text-gray-400 text-xs"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login2;
