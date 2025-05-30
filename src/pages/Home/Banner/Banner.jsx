import React from 'react';
import { Carousel } from 'react-responsive-carousel'; 
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import './Banner.css'

const Banner = () => {
    return (
        <div>
            <Carousel
                className='banner-img'
                thumbWidth={100} 
                interval={1500} 
                infiniteLoop={true} 
                showArrows={true}  
                autoPlay={true} 
                dynamicHeight
            >
                <div className='h-[400px] relative'> 
                    <img
                        className='h-full w-full object-cover'  
                        src='https://img.freepik.com/free-vector/flat-design-minimal-boutique-sale-background_23-2149337460.jpg?t=st=1741709539~exp=1741713139~hmac=d2b969d77854f3ee4b61795321ca2ecc2f4301a8b036f37dd3fee97c1ecbb1bc&w=996' 
                    />
                    {/* Shop Now Button */}
                    <Link 
                        to="/shop" 
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <button className="bg-primary-c hover:bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
                            Shop Now
                        </button>
                    </Link>
                </div>

                <div className='h-[400px] relative'>
                    <img 
                        className='h-full w-full object-cover' 
                        src='https://img.freepik.com/free-vector/watercolor-spring-twitter-header_23-2149258202.jpg?t=st=1741712676~exp=1741716276~hmac=7c5010f0d112f4e2132eed4c0b2d1f66603a51b7e30c2f8eed596ed14c931abe&w=1380' 
                    />
                    <Link 
                        to="/shop" 
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
                            Shop Now
                        </button>
                    </Link>
                </div>

                <div className='h-[400px] relative'>
                    <img 
                        className='h-full w-full object-cover' 
                        src='https://img.freepik.com/free-vector/flat-design-dance-show-template_23-2149309899.jpg?t=st=1741712840~exp=1741716440~hmac=27b2e075834140d53110b573cd90f405dd3f79cb4e6c08f0b1d780b857794197&w=1800' 
                    />
                    <Link 
                        to="/shop" 
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
                            Shop Now
                        </button>
                    </Link>
                </div>

                <div className='h-[400px] relative'>
                    <img 
                        className='h-full w-full object-cover' 
                        src='https://img.freepik.com/free-psd/shopping-sale-banner-with-photo_23-2148750918.jpg?t=st=1741710092~exp=1741713692~hmac=4b4d277d868b09f8916af85075df9246e1f0a97f1636e004d27629d407e3ca23&w=996' 
                    />
                    <Link 
                        to="/shop" 
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
                            Shop Now
                        </button>
                    </Link>
                </div>

                <div className='h-[400px] relative'>
                    <img 
                        className='h-full w-full object-cover' 
                        src='https://static.vecteezy.com/system/resources/previews/006/890/137/non_2x/fashion-illustration-fashionable-women-is-wearing-brown-and-holding-shopping-bags-free-vector.jpg' 
                    />
                    <Link 
                        to="/shop" 
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
                            Shop Now
                        </button>
                    </Link>
                </div>

            </Carousel>
        </div>
    );
};

export default Banner;
