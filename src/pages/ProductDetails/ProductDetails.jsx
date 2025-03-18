import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useEffect, useState } from "react";

import "./productDetails.css";

const ProductDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (thumbsSwiper) {
      // Set up a slide change listener to update the activeIndex
      const handleSlideChange = () => {
        setActiveIndex(thumbsSwiper.realIndex);
      };

      thumbsSwiper.on("slideChange", handleSlideChange);

      // Clean up the event listener when thumbsSwiper is destroyed
      return () => {
        if (thumbsSwiper) {
          thumbsSwiper.off("slideChange", handleSlideChange);
        }
      };
    }
  }, [thumbsSwiper]);

  const handleQuantityChange = (value) => {
    if (value < 1) return;
    setQuantity(value);
  };

  return (
    <div className="mt-8">
      <section className="relative">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 gap-32 mx-auto md:px-2 px-0">
            {/* Image Gallery */}
            <div className="h-96 w-full">
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                <SwiperSlide className="zoom-container">
                  <img
                    className="w-full h-96 object-cover "
                    src="https://swiperjs.com/demos/images/nature-1.jpg"
                    alt="Nature 1"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="w-full h-96 object-cover"
                    src="https://swiperjs.com/demos/images/nature-2.jpg"
                    alt="Nature 2"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="w-full h-96 object-cover"
                    src="https://swiperjs.com/demos/images/nature-3.jpg"
                    alt="Nature 3"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="w-full h-96 object-cover"
                    src="https://swiperjs.com/demos/images/nature-4.jpg"
                    alt="Nature 4"
                  />
                </SwiperSlide>
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper h-24 mt-4"
                slideToClickedSlide={true}
              >
                {[
                  "https://swiperjs.com/demos/images/nature-1.jpg",
                  "https://swiperjs.com/demos/images/nature-2.jpg",
                  "https://swiperjs.com/demos/images/nature-3.jpg",
                  "https://swiperjs.com/demos/images/nature-4.jpg",
                ].map((image, index) => (
                  <SwiperSlide
                    key={index}
                    className={`cursor-pointer border-2 transition-all ${
                      activeIndex === index
                        ? "border-primary-c border-4 ring-indigo-300" // Active thumbnail highlight
                        : "border-transparent"
                    }`}
                  >
                    <img
                      className={`w-full h-full object-cover`}
                      src={image}
                      alt={`Thumb ${index + 1}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Product Details */}
            <div className="w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
              <div className="w-full max-w-xl">
                <p className="text-lg font-medium leading-8 text-indigo-600 mb-4">
                  Clothing&nbsp; /&nbsp; Menswear
                </p>
                <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
                  Basic Yellow Tropical Printed Shirt
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                  <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                    $220
                  </h6>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(4)].map((_, i) => (
                        <svg
                          key={i}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                            fill="#FBBF24"
                          />
                        </svg>
                      ))}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                          fill="#F3F4F6"
                        />
                      </svg>
                    </div>
                    <span className="pl-2 font-normal leading-7 text-gray-500 text-sm">
                      1624 reviews
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 text-base font-normal mb-5">
                  Introducing our vibrant Basic Yellow Tropical Printed Shirt -
                  a celebration of style and sunshine! Embrace the essence of
                  summer wherever you go with this eye-catching piece that
                  effortlessly blends comfort and tropical flair.{" "}
                  <a href="#" className="text-indigo-600">
                    More....
                  </a>
                </p>
                <ul className="grid gap-y-4 mb-8">
                  {[
                    "Branded shirt",
                    "3 color shirt",
                    "Pure Cotton Shirt with 60% as 40%",
                    "All sizes available",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="26" height="26" rx="13" fill="#4F46E5" />
                        <path
                          d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                          stroke="white"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="font-normal text-base text-gray-900">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-900 text-lg leading-8 font-medium mb-4">
                  Size
                </p>
                <div className="w-full pb-8 border-b border-gray-100 flex-wrap">
                  <div className="grid grid-cols-3 min-[400px]:grid-cols-5 gap-3 max-w-md">
                    {["S", "M", "L", "XL", "XXL"].map((size, index) => (
                      <button
                        key={index}
                        className="bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector and Add to Cart */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-8">
                  <div className="flex sm:items-center sm:justify-center w-full">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="group py-4 px-6 border border-gray-400 rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
                    >
                      <svg
                        className="stroke-gray-900 group-hover:stroke-black"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 11H5.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(Number(e.target.value))
                      }
                      className="font-semibold text-gray-900 cursor-pointer text-lg py-[13px] px-6 w-full sm:max-w-[118px] outline-0 border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50"
                      placeholder="1"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="group py-4 px-6 border border-gray-400 rounded-r-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
                    >
                      <svg
                        className="stroke-gray-900 group-hover:stroke-black"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 5.5V16.5M16.5 11H5.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <button className="group py-4 px-5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-lg w-full flex items-center justify-center gap-2 transition-all duration-500 hover:bg-indigo-100">
                    <svg
                      className="stroke-indigo-600"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                    Add to cart
                  </button>
                </div>

                {/* Buy Now and Share Button */}
                <div className="flex items-center gap-3">
                  <button className="group transition-all duration-500 p-4 rounded-full bg-indigo-50 hover:bg-indigo-100 hover:shadow-sm hover:shadow-indigo-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                    >
                      <path
                        d="M4.47084 14.3196L13.0281 22.7501L21.9599 13.9506M13.0034 5.07888C15.4786 2.64037 19.5008 2.64037 21.976 5.07888C24.4511 7.5254 24.4511 11.4799 21.9841 13.9265M12.9956 5.07888C10.5204 2.64037 6.49824 2.64037 4.02307 5.07888C1.54789 7.51738 1.54789 11.4799 4.02307 13.9184M4.02307 13.9184L4.04407 13.939M4.02307 13.9184L4.46274 14.3115"
                        stroke="#4F46E5"
                        strokeWidth="1.6"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button className="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* tabs start */}
      {/* name of each tab group should be unique */}
     {/* name of each tab group should be unique */}
<div className="tabs tabs-lift">
  <input type="radio" name="my_tabs_3" className="tab" aria-label="Tab 1" />
  <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 1</div>

  <input type="radio" name="my_tabs_3" className="tab" aria-label="Tab 2" defaultChecked />
  <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 2</div>

  <input type="radio" name="my_tabs_3" className="tab" aria-label="Tab 3" />
  <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 3</div>
</div>
      {/* tabs ends */}
    </div>
  );
};

export default ProductDetails;
