import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle.jsx";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
const reviews = [
  {
    id: 1,
    name: "Emran",
    rating: 4.9,
    review: "যারা ট্রেন্ডি, আরামদায়ক ও ভালো মানের মহিলা পোশাক খুঁজছেন, তাদের জন্য এটি ভালো অপশন হতে পারে! 😊",
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
  },
  {
    id: 2,
    name: "Aisha",
    rating: 5,
    review: "আমি এই ব্র্যান্ডের পোশাক ব্যবহার করে অনেক খুশি! কাপড়ের মান অনেক ভালো।",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
  },
  {
    id: 3,
    name: "Rahim",
    rating: 4.5,
    review: "ডেলিভারি সময়মতো পেয়েছি, প্রোডাক্টের কোয়ালিটি একদম ঠিক আছে।",
    image: "https://images.unsplash.com/photo-1590086782792-88293191b6b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
  },
  {
    id: 4,
    name: "Sara",
    rating: 4.8,
    review: "ডিজাইন এবং ফিনিশিং দারুণ! কালার অনেক সুন্দর। আমি আবার অর্ডার করবো।",
    image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
  },
  {
    id: 5,
    name: "Farhan",
    rating: 4.3,
    review: "প্রোডাক্ট ভালো, তবে ডেলিভারির সময় একটু বেশি লেগেছে।",
    image: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
  },
  {
    id: 6,
    name: "Naila",
    rating: 5,
    review: "এক কথায় অসাধারণ! পারফেক্ট সাইজ এবং ডিজাইন। সবাইকে রিকমেন্ড করবো।",
    image: "https://images.unsplash.com/photo-1594633314293-30037d129c0b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
  },
  {
    id: 7,
    name: "Omar",
    rating: 4.6,
    review: "একটা প্রোডাক্ট কিনেছি, দাম অনুযায়ী কোয়ালিটি ভালো। আবার কিনবো।",
    image: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
  },
  {
    id: 8,
    name: "Fatima",
    rating: 4.7,
    review: "কালার, ফ্যাব্রিক সব দারুণ! কিন্তু সাইজ একটু বড় হয়েছে।",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
  }
];


const CustomerReview = () => {
  return (
    <div>
      <SectionTitle heading="Customers Review" />
      <div className="h-auto">
        <Swiper
          autoplay={{ delay: 1000 }}
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            320: { slidesPerView: 1 }, // মোবাইলে ১টি কার্ড
            640: { slidesPerView: 2 }, // ট্যাবলেটে ২টি কার্ড
            1024: { slidesPerView: 3 }, // ডেক্সটপে ৩টি কার্ড
          }}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide
              key={review.id}
              className="border border-primary-c text-stone-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-stone-100"
            >
              <div className="p-6 space-y-4 h-64 flex flex-col justify-between">
                {/* Profile Section */}
                <div className="flex items-center gap-4">
                  <img
                    alt="User profile"
                    src={review.image}
                    className="w-16 h-16 rounded-full object-cover border-4 border-primary-c"
                  />
                  <div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`mask mask-star w-5 h-5 ${
                            i < Math.round(review.rating) ? "bg-yellow-500" : "bg-gray-300"
                          }`}
                        ></span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 font-semibold">{review.rating}</p>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-lg text-gray-700 flex-1">{review.review}</p>

                {/* Reviewer Name */}
                <h1 className="font-semibold text-right text-gray-800">- {review.name}</h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CustomerReview;
