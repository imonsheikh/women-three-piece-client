import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 px-5 mt-5">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
                {/* Logo & About */}
                <div>
                    <h2 className="text-white text-2xl font-bold">Mehrab Fashion House</h2>
                    <p className="mt-3 text-gray-400">Your ultimate destination for elegant women's fashion.</p>
                </div>
                
                {/* Quick Links */}
                <div>
                    <h6 className="text-white font-semibold mb-3">Quick Links</h6>
                    <ul>
                        <li><a href="#" className="hover:text-white">Order Tracking</a></li>
                        <li><a href="#" className="hover:text-white">About Us</a></li>
                        <li><a href="#" className="hover:text-white">Contact Us</a></li>
                        <li><a href="#" className="hover:text-white">Login</a></li>
                        <li><a href="#" className="hover:text-white">Register</a></li>
                    </ul>
                </div>

                {/* Information */}
                <div>
                    <h6 className="text-white font-semibold mb-3">Information</h6>
                    <ul>
                        <li><a href="#" className="hover:text-white">Delivery Policy</a></li>
                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white">Return Policy</a></li>
                        <li><a href="#" className="hover:text-white">About Us</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h6 className="text-white font-semibold mb-3">Newsletter</h6>
                    <p className="text-gray-400 mb-3">Subscribe to get the latest updates & offers.</p>
                    <div className="flex">
                        <input type="email" placeholder="Enter your email" className="p-2 w-full rounded-l-md text-gray-800 bg-white" />
                        <button className="bg-primary-c px-4 py-2 text-white rounded-r-md">Subscribe</button>
                    </div>
                </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-8 text-center">
                <h6 className="text-white font-semibold mb-3">Follow Us</h6>
                <div className="flex justify-center space-x-5">
                    <a href="#" className="text-primary-c text-2xl hover:text-white"><FaFacebook /></a>
                    <a href="#" className="text-primary-c text-2xl hover:text-white"><FaInstagram /></a>
                    <a href="#" className="text-primary-c text-2xl hover:text-white"><FaTwitter /></a>
                    <a href="#" className="text-primary-c text-2xl hover:text-white"><FaYoutube /></a>
                </div>
                <hr className='text-white mt-4 max-w-7xl mx-auto' />
                <p className="text-gray-500 mt-5">&copy; Mehrab Fashion House. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;