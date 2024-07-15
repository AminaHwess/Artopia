import React, { useState } from "react";
import { motion, useScroll } from "framer-motion";
import Footer from "../../components/Footer/Footer.jsx";
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
      alert("Profile updated successfully!");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Profile update failed:", error);
    });
  };


  return (
    <div>
      {/* Upper Scroll Bar */}
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />

      {/* BioField Form */}
      <div className="w-[400px] max-w-full h-[700px] mx-auto mt-[1px] bg-white rounded-lg shadow-lg font-[Poppins, sans-serif] shadow-[#00000033] relative mb-[50px] mr-[550px]">
        <h1 className="text-center text-[30px] font-extrabold text-[#0f0f0f] pt-[20px] pb-[20px] font-[Super Normal]">
          Customize Your Profile
        </h1>
        <img src="\src\assets\artopialogo.png" className="w-[80%] mx-[30px] mt-[30px]" alt="Artopia Logo" />
        <form onSubmit={handleSubmit} className="px-[20px]">
          <label htmlFor="bio" className="block text-center mb-[8px] text-[14px] text-gray-500 font-bold font-serif">
            Write a short bio:
          </label>
          <textarea
            rows="2"
            placeholder="Tell us a bit about yourself !"
            className="w-[90%] p-[12px] border-2 border-[#9e8b96] rounded-[5px] text-[16px] box-border mb-[40px] ml-[20px] h-[200px] text-center"
            onChange={handleBioChange}
          ></textarea>
          <div className="relative">
            <label htmlFor="file-upload" className="absolute top-0 left-0">
              <img className="w-[15%] bg-[#f33ec9] rounded-[15px] ml-[20px] mb-[-7px] cursor-pointer" src="\src\assets\plus.png" alt="Upload" />
            </label>
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          {/* Conditionally display the uploaded file name */}
          <p className="inline-block align-middle ml-[70px] mt-[-8px]">{selectedFileName}</p>
          <input
            type="submit"
            className="w-[30%] p-[12px] bg-[#d226aa] border-none text-white text-[16px] font-bold rounded-[5px] cursor-pointer transition-colors duration-300 ease-in-out shadow-[0_0_10px_0_rgba(0,0,0,0.5)] mt-[25px] ml-[130px] relative hover:bg-[#98246c] hover:shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
          />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileCustom;
