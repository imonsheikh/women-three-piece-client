import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaUser, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin.jsx";

const InputField = ({ type, placeholder, icon }) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-white text-black rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
        {icon}
      </div>
    </div>
  );
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="bg-white min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative h-full">
            <img
              src="https://img.freepik.com/free-vector/fashion-woman-set_1284-16520.jpg?t=st=1742378114~exp=1742381714~hmac=0c16037d9d6776f78fa95eb4b1b58fa547e911469e54408009c23083aa69ba1e&w=740"
              alt="Ad Image"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-purple-900/30"></div>
            <div className="absolute bottom-12 left-12 text-white">
              <h2 className="text-3xl md:text-4xl font-semibold mb-2">Capturing Moments,</h2>
              <h2 className="text-3xl md:text-4xl font-semibold">Creating Memories</h2>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6 md:p-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-black text-3xl md:text-4xl font-semibold mb-2">Create an account</h1>
            <p className="text-gray-600 mb-8">
              Already have an account? <Link to="/login" className="text-purple-600 hover:underline text-lg">Log in</Link>
            </p>

            <form className="space-y-4 text-xs">
              <div className="flex flex-col md:flex-row gap-4">
                <InputField type="text" placeholder="First Name" icon={<FaUser />} />
                <InputField type="text" placeholder="Last Name" icon={<FaUser />} />
              </div>
              <InputField type="email" placeholder="Email" icon={<FaEnvelope />} />

              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full bg-white text-black rounded-lg p-3 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                  <FaLock />
                </div>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded bg-gray-200 border-gray-600 text-purple-600 focus:ring-purple-600" />
                <span className="text-gray-600">
                  I agree to the <a href="#" className="text-purple-600 hover:underline">Terms & Conditions</a>
                </span>
              </label>

              <button type="submit" className="w-full bg-purple-600 text-white rounded-lg p-3 hover:bg-purple-700 transition-colors">
                Create Account
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-400"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-100 text-gray-600">Or register with</span>
                </div>
              </div>

            <SocialLogin></SocialLogin>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;