import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/user/resetpassword/${token}`, { password });
  
      toast.success(response.data.message); // Show success message
      setTimeout(() => {
        navigate("/"); // Redirect to login after successful reset
      }, 1500);
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data); // Capture and log the error from the server
        toast.error(error.response.data.message || "Failed to reset password."); // Display error message to the user
      } else if (error.request) {
        console.error("No response received:", error.request); // Log if no response from server
        toast.error("Failed to reset password. No response from server.");
      } else {
        console.error("Error in request setup:", error.message); // Log any other request errors
        toast.error("Failed to reset password.");
      }
    }
  };

  return (
    <>
      <Toaster /> {/* This is required for toasts to show */}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center w-screen h-screen min-h-screen bg-black">
          <div className="outer-div w-96 h-[300px] min-w-52 p-[5.5px] flex justify-center items-center">
            <div className="w-full h-full p-10 flex flex-col justify-center items-center gap-4 bg-black z-10 rounded-tl-[50px] rounded-br-[50px]">
              <h1 className="text-white text-xl text-center">Reset Password</h1>
              <div className="flex gap-3 mt-10 justify-center items-center">
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-60 bg-transparent border-b-gray-400 border-b px-1 text-white"
                />
              </div>
              <button className="w-64 h-9 text-white mt-12 rounded-3xl border-[#c8a217] border hover:bg-[#c8a217]">
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
