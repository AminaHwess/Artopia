import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, useScroll } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer.jsx";
import UsermailField from "./forms_related_files/email_user_field.jsx";
import PasswordField from "./forms_related_files/passwordfield.jsx";
import AxiosInstance from "./Axios/AxiosInstance.jsx";

const Login = () => {
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const [ShowMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submission = (data) => {
    AxiosInstance.post("login/", {
      username: data.username,
      password: data.password,
    })
      .then((response) => {
        console.log(response);
        localStorage.setItem("Token", response.data.token);
        localStorage.setItem("UserId", response.data.userId);
        const userId = response.data.userId;
        navigate(`/userprofile/${userId}`);
      })
      .catch((error) => {
        console.error("Error during login", error);
        setShowMessage(true);
        setErrorMessage(error.response?.data?.error || "Username or Password is incorrect");
      });
  };

  return (
    <div>
      <Navbar />
      {/* Upper Scroll Bar */}
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Login Form */}
      <div className="w-full max-w-md h-[650px] mx-auto mt-1 bg-white rounded-lg shadow-lg font-poppins relative mt-[50px]">
        <h1 className="text-center text-3xl font-extrabold text-gray-900 py-5 font-super-normal">
          Login to
        </h1>
        <img
          src="src/assets/artopialogo.png"
          className="w-4/5 ml-8"
          alt="Logo"
        />
        <form
          autoComplete="on"
          onSubmit={handleSubmit(submission)}
          className="px-5 py-5"
        >
          <label
            htmlFor="usermail"
            className="block text-center mb-2 text-sm text-gray-600 font-bold"
          >
            Username or Email:
          </label>
          <UsermailField control={control} />
          <label
            htmlFor="password"
            className="block text-center mb-2 text-sm text-gray-600 font-bold"
          >
            Password:
          </label>
          <PasswordField control={control} />
          <input
            type="submit"
            value="Submit"
            className="w-2/5 px-4 py-3 bg-[#d226aa] text-white text-lg font-bold rounded-md cursor-pointer transition-colors duration-300 hover:bg-[#98246c] shadow-md mx-auto mt-13 block"
          />

          {/* Error Message */}
          {ShowMessage && (
            <p className="text-red-600 bg-red-100 p-3 rounded-md mt-4 text-center text-lg border border-red-600 mx-auto">
              {errorMessage}
            </p>
          )}

          {/* Redirect Page to SignUp */}
          <p className="mt-4 text-center">
            Still Haven't Joined Our Community Yet?
          </p>
          <Link to="/signup">
            <input
              type="button"
              value="Sign Up"
              className="w-2/5 px-4 py-3 bg-[#d522ab] text-white text-lg font-bold rounded-md cursor-pointer transition-colors duration-300 hover:bg-[#98246c] shadow-md mx-auto mt-2 block"
            />
          </Link>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
