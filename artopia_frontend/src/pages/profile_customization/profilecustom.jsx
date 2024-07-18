import React, { useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Image } from 'lucide-react';  // Import CirclePlus for the file upload button
import AxiosInstance from "../Axios/AxiosInstance.jsx";

const ProfileCustom = () => {
  const { scrollYProgress } = useScroll();
  const [selectedFile, setSelectedFile] = useState(null);
  const [bio, setBio] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("No file chosen");
  const [profileImage, setProfileImage] = useState("");  // Track profile image URL

  const loggedInUserId = localStorage.getItem("UserId");

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);  // Save the file to state
      setSelectedFileName(file.name);  // Set the file name to state
    } else {
      setSelectedFile(null);  // Clear file state if no file is chosen
      setSelectedFileName("No file chosen");
    }
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Construct FormData for file upload
    const formData = new FormData();
    formData.append("bio", bio);
    if (selectedFile) {
      formData.append("image", selectedFile);  // Append the selected file to the form data
    }

    AxiosInstance.put(`profile/${loggedInUserId}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      setBio("");  // Clear the bio state
      setSelectedFile(null);  // Clear the selected file
      setSelectedFileName("No file chosen");  // Reset the file name
      setProfileImage("");  // Clear the profile image state
      window.location.reload();
    })
  };

  return (
    <div className="rounded-lg  p-6 max-w-md mx-auto mt-4 mb-12 relative">
      {/* Upper Scroll Bar */}
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Change Photo Section */}
      <div className="flex flex-col items-center mb-6">
        <img src="\artopialogo.png" className="w-[80%] mx-auto " alt="Artopia Logo" />
        <label htmlFor="file-upload" className="mb-4 cursor-pointer mt-12">
        <label htmlFor="bio" className="block mb-2 md:text-xl font-serif text-xl text-gray-500 font-bold">
          Chnage Your Profile Picture
        </label>
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="text-sm text-gray-500 ml-14 absolute mb-1">{selectedFileName}</p>
          <Image strokeWidth={2.5} color="#ff90e8" size={20} className="ml-8" />
        </label>
      </div>

      {/* BioField Form */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="bio" className="block mb-2 md:text-xl text-xl font-serif text-gray-500 font-bold">
          Write a short bio:
        </label>
        <textarea
          rows="2"
          placeholder="Tell us a bit about yourself !"
          className="w-full p-3 border-2 border-[#9e8b96] rounded-lg text-lg  mb-4 h-[100px] text-center font-mono"
          onChange={handleBioChange}
        ></textarea>
        <button
          type="submit"
          className="bg-[#d226aa] text-white py-2 px-8 rounded-lg hover:bg-[#98246c] transition-colors duration-300 ease-in-out font-mono "
        >
          Change
        </button>
      </form>
    </div>
  );
};

export default ProfileCustom;
