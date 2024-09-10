import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/user/forgetpassword", { email });
      toast.success("Password reset email sent!");

      // Redirect to homepage after successful reset
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      if (error.response) {
        // Server responded with an error status
        console.error("Error response:", error.response.data);
        toast.error("Error: " + error.response.data.error || "Failed to send reset link.");
      } else if (error.request) {
        // No response received from server
        console.error("No response received:", error.request);
        toast.error("No response received from server.");
      } else {
        // Error setting up the request
        console.error("Error in request setup:", error.message);
        toast.error("Error: " + error.message);
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
              <h1 className="text-white text-xl text-center">Forget Password</h1>
              <div className="flex gap-3 mt-10 justify-center items-center">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-60 bg-transparent border-b-gray-400 border-b px-1 text-white"
                />
              </div>
              <button className="w-64 h-9 text-white mt-12 rounded-3xl border-[#c8a217] border hover:bg-[#c8a217]">
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgetPassword;
