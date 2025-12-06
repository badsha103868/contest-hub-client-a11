import React from "react";
import logoImg from "../../assets/logo.png";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50 ">
      <span className="text-4xl font-bold">L</span>
      <img
        src={logoImg}
        alt="Loading..."
        className="w-10 h-10 animate-spin m-2"
      />
      <span className="text-4xl font-bold">A D I N G</span>
    </div>
  );
};

export default Loading;