import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import RatingStar from "../RatingStar/RatingStar.jsx";

const ProductCard = ({product}) => { 
  
  // console.log(product);
  const {name, image, rating, price} = product 
  

  return (
    <Link to={`/product-details/${product._id}`} className="bg-white flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all">
      <div className="w-full">
        <img
          src={image}
          alt="Product 1"
          className="w-full object-cover object-top aspect-[230/307]"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
            {name}
          </h5>
          <div className="mt-2 flex items-center flex-wrap gap-2">
            <h6 className="text-sm sm:text-base font-semibold text-slate-900">
              ${price}
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
           {/* Rating Component */}
           <RatingStar rating={rating}></RatingStar>
        </div>
        <button
          type="button"
          className="text-sm px-2 py-2 font-medium w-full mt-4 bg-primary-c hover:bg-blue-700 text-white tracking-wide ml-auto outline-none border-none rounded"
        >
          Add to cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
