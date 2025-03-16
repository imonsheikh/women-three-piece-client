import React from "react";

const SectionTitle = ({ heading }) => {
  return (
    <div className="text-center my-10">
      <h1
        className="relative md:text-2xl text-xl font-extrabold text-transparent bg-clip-text 
        bg-gradient-to-r from-gray-800 to-black dark:from-gray-600 dark:to-black 
        inline-block tracking-wide animate-fadeIn"
      >
        {heading}
      </h1>
      <div className="mt-2 w-20 h-1 mx-auto bg-gradient-to-r from-gray-700 to-black rounded-full"></div>
    </div>
  );
};

export default SectionTitle;
