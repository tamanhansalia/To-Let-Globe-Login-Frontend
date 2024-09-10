import React, { useState } from "react";
import "../components/border.css";
import { MdOutlineMail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { BiSolidUserDetail } from "react-icons/bi";
import { FaSchool } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    phone_number: "",
    role: "",
    first_school: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        userData
      );
      // Show success toast
      toast.success("Registration successful!");
      
      // Redirect to login after successful registration
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      if (error.response) {
        console.error("Error during registration:", error.response.data);
        toast.error("Registration failed: " + error.response.data.error);
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response received from server.");
      } else {
        console.error("Error setting up request:", error.message);
        toast.error("Error: " + error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Toaster /> {/* This is required for toasts to show */}
      <div className="flex justify-center items-center w-screen h-screen min-h-screen bg-black">
        <div className="outer-div w-96 h-[600px] min-w-52 p-[5.5px] flex justify-center items-center">
          <div className="w-full h-full p-10 flex flex-col justify-center items-center bg-black z-10 rounded-tl-[50px] rounded-br-[50px]">
            <h1 className="text-white font-semibold text-3xl text-center">
              Register
            </h1>
            <div className="flex gap-2 mt-10 justify-center items-center">
              <FaUser size={"18px"} className="text-white" />
              <input
                type="text"
                placeholder="Username"
                required
                name="username"
                onChange={handleChange}
                value={userData.username}
                className="w-60 bg-transparent border-b-gray-400 border-b px-1 text-white"
              />
            </div>
            <div className="flex gap-2 mt-10 justify-center items-center">
              <MdOutlineMail size={"18px"} className="text-white" />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                onChange={handleChange}
                value={userData.email}
                className="w-60 bg-transparent border-b-gray-400 border-b px-1 text-white"
              />
            </div>
            <div className="flex gap-2 mt-10 justify-center items-center">
              <FaLock size={"20px"} className="text-white" />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                onChange={handleChange}
                value={userData.password}
                className="w-60 bg-transparent border-b-gray-400 border-b px-1 text-white"
              />
            </div>
            <div className="flex gap-2 mt-10 justify-center items-center">
              <FaPhone size={"18px"} className="text-white" />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                name="phone_number"
                onChange={handleChange}
                value={userData.phone_number}
                className="w-60 bg-transparent border-b-gray-400 border-b px-1 text-white"
              />
            </div>
            <div className="flex gap-2 mt-10 justify-center items-center">
              <BiSolidUserDetail size={"20px"} className="text-white" />
              <select
                name="role"
                onChange={handleChange}
                value={userData.role}
                className="w-60 bg-black border-b-gray-400 border-b px-1 text-white"
                required
              >
                <option value="">Select Role</option>
                <option value="Buyer">Buyer</option>
                <option value="Tenant">Tenant</option>
                <option value="Owner">Owner</option>
                <option value="User">User</option>
                <option value="Content Creator">Content Creator</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="flex gap-2 mt-10 justify-center items-center">
              <FaSchool size={"18px"} className="text-white" />
              <input
                type="text"
                placeholder="Your First School"
                required
                name="first_school"
                onChange={handleChange}
                value={userData.first_school}
                className="w-60 bg-transparent border-b-gray-400 border-b px-1 text-white"
              />
            </div>
            <button className="w-64 h-9 text-white mt-12 rounded-3xl border-[#c8a217] border hover:bg-[#c8a217]">
              Register
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
