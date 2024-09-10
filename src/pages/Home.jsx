// src/components/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen min-h-screen bg-black">
      <div className="outer-div w-96 h-[300px] min-w-52 p-[5.5px] flex flex-col justify-center items-center">
        <div className="w-full h-full p-10 flex flex-col justify-center items-center gap-4 bg-black z-10 rounded-tl-[50px] rounded-br-[50px]">
          <h1 className="text-white text-3xl text-center">Welcome to Our App</h1>
          <p className="text-white text-center mt-4">Please <Link to="/" className="text-[#c8a217]">Login</Link> to continue.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
