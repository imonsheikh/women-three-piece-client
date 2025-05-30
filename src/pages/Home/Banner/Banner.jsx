import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Banner.css";

const Banner = () => {
  const slides = [
    {
      img: "https://img.freepik.com/free-vector/flat-design-minimal-boutique-sale-background_23-2149337460.jpg?t=st=1741709539~exp=1741713139~hmac=d2b969d77854f3ee4b61795321ca2ecc2f4301a8b036f37dd3fee97c1ecbb1bc&w=996",
      alt: "Boutique Sale",
    },
    {
      img: "https://img.freepik.com/free-vector/watercolor-spring-twitter-header_23-2149258202.jpg?t=st=1741712676~exp=1741716276~hmac=7c5010f0d112f4e2132eed4c0b2d1f66603a51b7e30c2f8eed596ed14c931abe&w=1380",
      alt: "Spring Collection",
    },
    {
      img: "https://img.freepik.com/free-vector/flat-design-dance-show-template_23-2149309899.jpg?t=st=1741712840~exp=1741716440~hmac=27b2e075834140d53110b573cd90f405dd3f79cb4e6c08f0b1d780b857794197&w=1800",
      alt: "Dance Show Template",
    },
    {
      img: "https://img.freepik.com/free-psd/shopping-sale-banner-with-photo_23-2148750918.jpg?t=st=1741710092~exp=1741713692~hmac=4b4d277d868b09f8916af85075df9246e1f0a97f1636e004d27629d407e3ca23&w=996",
      alt: "Shopping Sale Banner",
    },
    {
      img: "https://static.vecteezy.com/system/resources/previews/006/890/137/non_2x/fashion-illustration-fashionable-women-is-wearing-brown-and-holding-shopping-bags-free-vector.jpg",
      alt: "Fashion Illustration",
    },
  ];

  return (
    <div>
      <Carousel
        className="banner-img"
        thumbWidth={100}
        interval={3000}
        infiniteLoop
        showArrows
        autoPlay
        dynamicHeight={false}
        showStatus={false}
        showThumbs={false}
      >
        {slides.map(({ img, alt }, idx) => (
          <div key={idx} className="relative h-[400px]">
            <img src={img} alt={alt} className="h-full w-full object-cover" />
            {/* Overlay with button */}
            <div className="absolute bottom-8 right-8">
              <Link
                to="/shop"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-3 rounded-md shadow-lg transition"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
