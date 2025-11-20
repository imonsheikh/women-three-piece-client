import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useBanners from "../../../hooks/useBanners.jsx";
import "./Banner.css"; //

const Banner = () => {
  const [banners, isLoading] = useBanners();

  if (isLoading) {
    return <p className="text-center py-10">Loading banners...</p>;
  }

  return (
    <div className="banner-img">
      <Carousel
        thumbWidth={100} // thumbnail width control
        interval={1500}
        infiniteLoop
        showArrows
        autoPlay
        dynamicHeight
      >
        {banners.map((slide, index) => (
          <div key={slide._id || index} className="md:h-[400px] h-[150px] w-full relative">
            <img
              className="h-full w-full object-cover "
              src={slide.image}
              alt={slide.title || `Slide ${index + 1}`}
            />
            <Link
              to="/products"
              className="absolute inset-0 flex items-center justify-center"
            >
              <button className="bg-primary-c hover:bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 text-xs">
                Shop Now
              </button>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
