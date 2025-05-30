import React, { useEffect, useState } from "react";
import {
  FaRegEye,
  FaRegEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SocialLogin from "../../components/SocialLogin/SocialLogin.jsx";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import useAxiosPublic from "../../hooks/useAxiosPublic.jsx";
import Swal from "sweetalert2/src/sweetalert2.js"; 

const InputField = ({
  type,
  placeholder,
  icon,
  register,
  name,
  validation,
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
        className="w-full bg-white text-black rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
        {icon}
      </div>
    </div>
  );
};

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log("Form Submitted", data);
  
    try {
      // console.log("Form Submitted", data); 
      // createUser 
      const res = await createUser(data?.email, data?.password);
      // console.log(res.user, "Logged User");
  
      const fullName = `${data.firstName} ${data.lastName}`;
  
      const userInfo = {
        firstName: data.firstName,
        lastName: data.lastName,
        name: fullName,
        email: data.email,
        password: data?.password,
      };
  
      const response = await axiosPublic.post("/users", userInfo);
      if (response.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Created Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="bg-pink-600  flex items-center justify-center p-4 lg:min-h-[calc(100vh-103px)] min-h-[calc(100vh-55px)]">
      <div className="w-full min-h-[600px] max-w-[1200px] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 relative">
          <img
            src="https://img.freepik.com/free-vector/fashion-woman-set_1284-16520.jpg"
            alt="Ad"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-purple-900/30"></div>
          <div className="absolute bottom-12 left-12 text-white">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Capturing Moments,
            </h2>
            <h2 className="text-3xl md:text-4xl font-semibold">
              Creating Memories
            </h2>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-12">
          <h1 className="text-black text-3xl md:text-4xl font-semibold mb-2">
            Register
          </h1>
          <p className="text-gray-600 mb-8">
            Already have an account?
            <Link
              to="/login"
              className="text-purple-600 hover:underline text-lg"
            >
              {" "}
              Log in
            </Link>
          </p>

          {Object.keys(errors).length > 0 && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <ul>
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error.message}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
            <div className="flex flex-col md:flex-row gap-4">
              <InputField
                name="firstName"
                type="text"
                placeholder="First Name"
                icon={<FaUser />}
                register={register}
                validation={{
                  required: "First Name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Only letters are allowed",
                  },
                }}
              />
              <InputField
                name="lastName"
                type="text"
                placeholder="Last Name"
                icon={<FaUser />}
                register={register}
                validation={{
                  required: "Last Name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Only letters are allowed",
                  },
                }}
              />
            </div>

            <InputField
              name="email"
              type="email"
              placeholder="Email"
              icon={<FaEnvelope />}
              register={register}
              validation={{ required: "Email is required" }}
            />

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters required",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message:
                      "Password must contain at least 1 lowercase letter, 1 uppercase letter, and 1 number",
                  },
                })}
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
                {showPassword ? (
                  <FaRegEye size={15} />
                ) : (
                  <FaRegEyeSlash size={15} />
                )}
              </button>
            </div>
            {/*           
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" {...register("terms", { required: "You must agree to terms" })} className="rounded bg-gray-200 border-gray-600 text-purple-600 focus:ring-purple-600" />
              <span className="text-gray-600">I agree to the <a href="#" className="text-purple-600 hover:underline">Terms & Conditions</a></span>
            </label> */}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white rounded-lg p-3 hover:bg-purple-700 transition-colors text-base"
            >
              Register
            </button>

            <div className="divider">OR</div>
          </form>
          <SocialLogin />
        </div>
      </div>
    </section>
  );
};

export default Register;
