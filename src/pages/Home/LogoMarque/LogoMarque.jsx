import React from "react";
import Marquee from "react-fast-marquee"; 
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaApple, FaGoogle, FaAmazon, FaMicrosoft } from "react-icons/fa";


const LogoMarque = () => {
  return (
    <div className="my-15">
      <Marquee pauseOnHover={true} speed={60}>
      <div className="flex space-x-8 text-white text-6xl ">
          <FaFacebook className="text-blue-600" />
          <FaTwitter className="text-blue-400" />
          <FaInstagram className="text-pink-500" />
          <FaLinkedin className="text-blue-700" />
          <FaApple className="text-gray-300" />
          <FaGoogle className="text-red-500" />
          <FaAmazon className="text-yellow-500" />
          <FaMicrosoft className="text-green-600" />
          <FaLinkedin className="text-blue-700" />
        </div>
      </Marquee>
    </div>
  );
};

export default LogoMarque;
