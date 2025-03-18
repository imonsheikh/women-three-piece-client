import React, { useEffect, useRef, useState } from "react";

const SectionTitle = ({ heading }) => {
    const headingRef = useRef(null) 
    const [underLineWidth, setUnderLineWidth] = useState(0) 

    useEffect(() => {
      if(headingRef.current){
        setUnderLineWidth(headingRef.current.offsetWidth)
      }
    }, [heading])

  return (
    <div className="text-center my-10 ">
      <h1 
        ref={headingRef}
        className="relative md:text-2xl text-xl font-extrabold text-transparent bg-clip-text 
        bg-gradient-to-r from-gray-800 to-black dark:from-gray-600 dark:to-black 
        inline-block tracking-wide animate-fadeIn"
      >
        {heading}
      </h1>
      <div 
      style={{width: `${underLineWidth}px`}}
      className="mt-2 px h-1 mx-auto bg-gradient-to-r from-gray-700 to-black rounded-full"></div> 
    </div>
  );
};

export default SectionTitle;
