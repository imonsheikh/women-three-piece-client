import React, { useEffect, useRef, useState } from "react";

const SectionTitle = ({ heading }) => {
  const headingRef = useRef(null);
  const [underLineWidth, setUnderLineWidth] = useState(0);

  useEffect(() => {
    if (headingRef.current) {
      setUnderLineWidth(headingRef.current.offsetWidth);
    }
  }, [heading]);

  return (
    <div className="text-center my-4">
      <h2
        ref={headingRef}
        className="text-md md:text-2xl font-bold text-gray-800 dark:text-gray-700 inline-block"
      >
        {heading}
      </h2>

      {/* Underline that matches text width */}
      <div
        style={{ width: underLineWidth }}
        className="h-1 mt-2 bg-blue-500 rounded-full mx-auto"
      />
    </div>
  );
};

export default SectionTitle;
