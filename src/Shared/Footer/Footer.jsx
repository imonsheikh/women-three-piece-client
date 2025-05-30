import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* 1. Logo & About */}
        <div>
          <h2 className="text-white text-2xl font-bold">Mehrab Fashion House</h2>
          <p className="mt-3 text-sm text-gray-400">
            Your ultimate destination for elegant women's fashion.
          </p>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h6 className="text-white font-semibold mb-3 text-base">Quick Links</h6>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Shop</a></li>
            <li><a href="#" className="hover:text-white transition">Login</a></li>
            <li><a href="#" className="hover:text-white transition">Register</a></li>
          </ul>
        </div>

        {/* 3. Customer Service */}
        <div>
          <h6 className="text-white font-semibold mb-3 text-base">Customer Service</h6>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Order Tracking</a></li>
            <li><a href="#" className="hover:text-white transition">Return Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* 4. Contact Info */}
        <div>
          <h6 className="text-white font-semibold mb-3 text-base">Contact Us</h6>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-2">
              <FaPhone className="text-primary-c" />
              <span>+880 1234-567890</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaEnvelope className="text-primary-c" />
              <span>support@mehrabfashion.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-primary-c" />
              <span>Gulshan, Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 text-center">
        <h6 className="text-white font-semibold mb-4 text-base">Follow Us</h6>
        <div className="flex justify-center space-x-5 mb-6">
          <a href="#" className="text-primary-c text-xl hover:text-white"><FaFacebook /></a>
          <a href="#" className="text-primary-c text-xl hover:text-white"><FaInstagram /></a>
          <a href="#" className="text-primary-c text-xl hover:text-white"><FaTwitter /></a>
          <a href="#" className="text-primary-c text-xl hover:text-white"><FaYoutube /></a>
        </div>
        <hr className="border-gray-700 max-w-7xl mx-auto" />
        <p className="text-sm text-gray-500 mt-4">&copy; {new Date().getFullYear()} Mehrab Fashion House. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
