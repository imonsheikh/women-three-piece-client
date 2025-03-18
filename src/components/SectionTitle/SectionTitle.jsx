import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SectionTitle = ({ heading }) => {
  const headingRef = useRef(null);
  const [underLineWidth, setUnderLineWidth] = useState(0);

  useEffect(() => {
    if (headingRef.current) {
      setUnderLineWidth(headingRef.current.offsetWidth);
    }
  }, [heading]);

  return (
    <div className="text-center my-12">
      {/* Heading with Glow & Bright Gradient */}
      <h1
        ref={headingRef}
        className="relative md:text-3xl text-3xl font-extrabold text-transparent bg-clip-text 
        bg-gradient-to-r from-blue-900 via-purple-900  
        dark:from-blue-600 dark:to-purple-600 
        inline-block tracking-wide drop-shadow-lg animate-fadeIn"
        // style={{ textShadow: "0px 0px 10px rgba(147, 51, 234, 0.6)" }} // Glow Effect
      >
        {heading}
      </h1>

      {/* Animated Underline with Glow Effect */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: underLineWidth }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="mt-2 h-1 mx-auto bg-gradient-to-r from-blue-500 via-purple-500        dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 
        rounded-full shadow-lg"
        // style={{ boxShadow: "0px 0px 12px rgba(147, 51, 234, 0.7)" }} // Glow Effect
      />
    </div>
  );
};

export default SectionTitle;
