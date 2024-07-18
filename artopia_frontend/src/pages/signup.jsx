import React from "react";
import { motion, useScroll } from "framer-motion";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer.jsx";
import EmailField from "./forms_related_files/email_field.jsx";
import PasswordField1 from "./forms_related_files/password_field1.jsx";
import { useForm, Controller } from "react-hook-form";
import PasswordField2 from "./forms_related_files/password_field2.jsx";
import UsernameField from "./forms_related_files/username_field.jsx";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AxiosInstance from "./Axios/AxiosInstance.jsx";

const Signup = () => {
  const { scrollYProgress } = useScroll();

  const schema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    username: yup.string().required("Username is required"),
    password1: yup
      .string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":;{}|<>+]/,
        "Password must contain at least one special character"
      ),
    password2: yup
      .string()
      .required("Password confirmation is a required field")
      .oneOf([yup.ref("password1"), null], "Passwords must match"),
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const submission = (data) => {
    if (data.password1 !== data.password2) {
      setError("password2", {
        type: "manual",
        message: "Passwords must match",
      });
      return;
    }

    AxiosInstance.post("signup/", {
      email: data.email,
      username: data.username,
      password: data.password1, 
    })
      .then((response) => {
        if (response.status === 201) {
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const backendErrors = error.response.data;
          if (backendErrors.username) {
            setError("username", {
              type: "manual",
              message: backendErrors.username,
            });
          }
          if (backendErrors.email) {
            setError("email", {
              type: "manual",
              message: backendErrors.email,
            });
          }
        } else {
          setError("server", {
            type: "manual",
            message:
              "Error signing up: Please check your email or username, as it may already be in use.",
          });
        }
      });
  };

  return (
    <div>
      <Navbar />
      {/* Upper Scroll Bar */}
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Signup Form */}
      <div
        id="signupform"
        className="w-[400px] max-w-full h-[640px] mx-auto mt-1 bg-white rounded-lg shadow-md shadow-[#0000001a] font-poppins mt-[1px] ml-[550px]"
      >
        <h1 className="text-center py-5 text-3xl font-extrabold text-[#0f0f0f] font-super-normal">
          Sign up to
        </h1>
        <img
          src="/artopialogo.png"
          id="logo"
          className="w-[80%] ml-[30px]"
          alt="Artopia Logo"
        />
        <form
          autoComplete="on"
          onSubmit={handleSubmit(submission)}
          className="px-5"
        >
          <label className="block text-center mb-2 text-sm text-gray-600 font-bold">
            Username:
          </label>
          <UsernameField control={control} />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
          <label className="block text-center mb-2 text-sm text-gray-600 font-bold">
            Email:
          </label>
          <EmailField control={control} />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}

          <label className="block text-center mb-2 text-sm text-gray-600 font-bold">
            Password:
          </label>
          <PasswordField1 control={control} />
          {errors.password1 && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password1.message}
            </p>
          )}

          <label className="block text-center mb-2 text-sm text-gray-600 font-bold">
            Repeat Password:
          </label>
          <PasswordField2 control={control} />
          {errors.password2 && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password2.message}
            </p>
          )}

          {errors.server && (
            <p className="text-red-500 text-sm mt-1">{errors.server.message}</p>
          )}

          <input
            type="submit"
            value="Submit"
            className="w-[40%] py-3 bg-[#d226aa] text-white text-lg font-bold rounded-md cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#98246c] shadow-md shadow-[#00000080] ml-[120px] mt-5"
          />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
