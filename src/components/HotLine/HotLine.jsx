import React from "react";
import { IoCall } from "react-icons/io5";

const HotLine = () => {
  return (
    <div className="flex justify-end items-center gap-4 md:flex hidden">
      <div className="relative">
        <IoCall className="text-primary-c" size={30} />
        {/* Ping effect on the icon */}
        <div className="absolute inset-0 bg-primary-c rounded-full opacity-40 animate-ping"></div>
      </div>
      <div>
        <h1 className="font-bold">Hotline</h1>
        <p>01891657994</p>
      </div>
    </div>
  );
};

export default HotLine;
