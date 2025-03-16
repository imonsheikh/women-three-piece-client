import React from "react";
import { IoCall } from "react-icons/io5";

const HotLine = () => {
  return (
    <div className="flex justify-end items-center gap-4 md:flex hidden">
      <IoCall className="text-primary-c" size={30}></IoCall> 
      <div>
      <h1 className="font-bold">Hotline</h1>
      <p>01845925526</p>
      </div>
    </div>
  );
};

export default HotLine;
