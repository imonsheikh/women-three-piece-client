import React from "react";

const RatingStar = ({ rating = 0 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starClass = "text-yellow-500 text-xl"; 

  return (
    <div className="flex items-center space-x-1">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className={starClass}>
          ★
        </span>
      ))}

      {/* Half Star */}
      {hasHalfStar && (
        <span key="half" className={`${starClass} relative`}>
          <span className="absolute left-0 overflow-hidden w-1/2">★</span>
          <span className="text-gray-300">★</span>
        </span>
      )}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300 text-base">
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStar;


 

        //   <div className="rating rating-xs">
        //     <div className="mask mask-star" aria-label="1 star"></div>
        //     <div className="mask mask-star" aria-label="2 star"></div>
        //     <div
        //       className="mask mask-star"
        //       aria-label="3 star"
        //       aria-current="true"
        //     ></div>
        //     <div className="mask mask-star" aria-label="4 star"></div>
        //     <div className="mask mask-star" aria-label="5 star"></div>
        //   </div>