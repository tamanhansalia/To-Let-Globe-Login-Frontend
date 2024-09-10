import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/border.css";
import { MdOutlineMail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // To redirect after successful login

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        loginData
      );
      const { token } = response.data;

      // Save token to localStorage
      localStorage.setItem("authToken", token);

      // Show success toast
      toast.success("Login successful!");

      // Redirect to home page or dashboard after a successful login
      setTimeout(() => {
        navigate('/home'); // Adjust route as necessary
      }, 1500);

    } catch (error) {
      if (error.response) {
        console.error("Error during login:", error.response.data);
        toast.error("Invalid credentials!");
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("Server not responding. Try again later.");
      } else {
        console.error("Login error:", error.message);
        toast.error("Login failed!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Toaster /> {/* This is required for toasts to show */}
      <div className="flex justify-center items-center w-screen h-screen min-h-screen bg-black">
        <div className="outer-div w-96 h-[450px] min-w-52 p-[5.5px] flex justify-center items-center">
          <div className="w-full h-full p-10 flex flex-col justify-center items-center gap-4 bg-black z-10 rounded-tl-[50px] rounded-br-[50px]">
            <h1 className="text-white text-xl text-center">Login</h1>
            <div className="flex gap-3 mt-10 justify-center items-center">
              <MdOutlineMail size={"20px"} className="text-white" />
              <input
                type="email"
                name="email"  
                placeholder="Email"
                required
                onChange={handleChange}
                value={loginData.email}
                className="w-60 bg-transparent border-b-gray-400 border-b px-1 text-white"
              />
            </div>
            <div className="flex gap-3 mt-10 justify-center items-center">
              <FaLock size={"20px"} className="text-white" />
              <input
                type="password"
                name="password"  
                placeholder="Password"
                required
                onChange={handleChange}
                value={loginData.password}
                className="w-60 bg-transparent border-b-gray-400 border-b px-1 text-white"
              />
            </div>
            <button className="w-64 h-9 text-white mt-12 rounded-3xl border-[#c8a217] border hover:bg-[#c8a217]">
              Login
            </button>
            <div className="flex justify-between items-center w-64 mt-8 text-[#3cbdb1]">
              <Link to="/forgetpassword">Forgot Password?</Link>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
