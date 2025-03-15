import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";

const ProductCard = () => {
  return (
    <div className="bg-white flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all">
      <div className="w-full">
        <img
          src="https://readymadeui.com/images/product1.webp"
          alt="Product 1"
          className="w-full object-cover object-top aspect-[230/307]"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
            Lexicon Luxe
          </h5>
          <div className="mt-2 flex items-center flex-wrap gap-2">
            <h6 className="text-sm sm:text-base font-semibold text-slate-900">
              $10
            </h6>
            <div
              className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto"
              title="Wishlist"
            >
              <div className="flex gap-1.5">
                <FaRegEye
                  size={20}
                  data-tooltip-id="my-tooltip" 
                  data-tooltip-content="View Details"
                  className="cursor-pointer"
                />
                <CiHeart 
                  data-tooltip-id="my-tooltip" 
                  data-tooltip-content="Wishlist"
                  className="cursor-pointer"
                  size={20}
                  title="wishlist"
                />
              </div>
            </div>
          </div>
          <div className="rating rating-xs">
            <div className="mask mask-star" aria-label="1 star"></div>
            <div className="mask mask-star" aria-label="2 star"></div>
            <div
              className="mask mask-star"
              aria-label="3 star"
              aria-current="true"
            ></div>
            <div className="mask mask-star" aria-label="4 star"></div>
            <div className="mask mask-star" aria-label="5 star"></div>
          </div>
        </div>
        <button
          type="button"
          className="text-sm px-2 py-2 font-medium w-full mt-4 bg-primary-c hover:bg-blue-700 text-white tracking-wide ml-auto outline-none border-none rounded"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
