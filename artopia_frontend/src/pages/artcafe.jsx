import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import ShareButtons from "../components/ShareButtons/sharebutton.jsx";
import Footer from "../components/Footer/Footer.jsx";
import AxiosInstance from "./Axios/AxiosInstance.jsx";
import { useForm } from "react-hook-form";
import { MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";

const Artcafe = () => {
  const Token = localStorage.getItem("Token");
  const { register, handleSubmit } = useForm();
  const { scrollYProgress } = useScroll();
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loggedInUserId = localStorage.getItem("UserId");

  

  const submission = async (data) => {
    const formData = new FormData();
    formData.append("description", data.description);
    if (data.music && data.music.length > 0) {
      formData.append("file", data.music[0]);
    }
    if (data.image && data.image.length > 0) {
      formData.append("file", data.image[0]);
    }
    if (data.video && data.video.length > 0) {
      formData.append("file", data.video[0]);
    }

    try {
      await AxiosInstance.post("posts/artcafepost/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${Token}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error posting new art cafe post:", error);
      setError("Error posting new art cafe post");
    }
  };

  const postComment = async (data, postId) => {
    const formData2 = new FormData();
    formData2.append("content", data.content);

    try {
      const response = await AxiosInstance.post(
        `posts/artcafepost/${postId}/comments/`,
        formData2,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${Token}`, // Ensure the token is valid
          },
        }
      );
if (response.status === 201 || response.status === 200) {
      window.location.reload();
    }    } catch (error) {
      console.error(
        "Error submitting comment:",
        error.response ? error.response.data : error.message // More specific error message
      );
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await AxiosInstance.get("posts/artcafeposts/");
        console.log("Posts fetched: ", response.data);
        setPost(response.data.sort((a, b) => b.post_id - a.post_id));
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await AxiosInstance.get("posts/artcafepost/comments");
        console.log("Comments fetched: ", response.data);
        setComment(response.data.sort((a, b) => b.comment_id - a.comment_id));
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("Error fetching comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComment();
  }, []);

  const deletepost = (postId) => {
    AxiosInstance.delete(`posts/artcafepost/${postId}/`)
      .then((response) => {
        console.log("Delete successful", response);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error during delete", error);
      });
  };

  return (
    <div className="artwisdom">
      <motion.div
        className="fixed z-1000 top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-transparent"
        style={{ scaleX: scrollYProgress }}
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1 }}
      >
        <Navbar />
        {Token && (
          <div className="post-form-container mx-4 sm:mx-auto max-w-full sm:max-w-3xl bg-white p-4 sm:p-5 rounded-lg shadow-xl mb-10">
            <form method="post" onSubmit={handleSubmit(submission)}>
              <textarea
                rows="2"
                placeholder="Share your post description (Required)"
                id="textarea"
                {...register("description")}
                required
                className="border-[#ff90e8] border-2 p-3 sm:p-5 w-full rounded-lg resize-none text-base font-sans"
              />
              <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
                <div className="flex flex-wrap gap-4 mb-4 sm:mb-0">
                  <label className="relative w-[32px] h-[32px]">
                    <i className="material-icons text-[#ff90e8] text-xl sm:text-2xl cursor-pointer">
                      music_note
                    </i>
                    <input
                      type="file"
                      {...register("music")}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                  <label className="relative w-[32px] h-[32px]">
                    <i className="material-icons text-[#ff90e8] text-xl sm:text-2xl cursor-pointer">
                      image
                    </i>
                    <input
                      type="file"
                      {...register("image")}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                  <label className="relative w-[32px] h-[32px]">
                    <i className="material-icons text-[#ff90e8] text-xl sm:text-2xl cursor-pointer">
                      videocam
                    </i>
                    <input
                      type="file"
                      {...register("video")}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-[#ff90e8] text-white rounded-lg px-4 sm:px-5 py-2.5 cursor-pointer text-sm sm:text-base"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        )}
        {/* Posts section */}
        <div className="md:mx-[250px]">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : post.length === 0 ? (
            <p>No posts available</p>
          ) : (
            post.map((postItem) => (
              
              <div
                key={postItem.post_id}
                className="post-container bg-white rounded-lg p-4 sm:p-6 mb-6 shadow-xl relative"
              >
                
                {Token && loggedInUserId.toString() === postItem.user_id.toString() && (
                  <button
                    type="button"
                    onClick={() => deletepost(postItem.post_id)}
                    className="md:ml-[850px] bg-[#ff90e8] text-white rounded-lg px-4 sm:px-5 py-2.5 cursor-pointer text-sm sm:text-base"
                  >
                    Delete
                  </button>
                )}

                <div className="post-header md:flex md:flex-row md:items-center flex mb-4">
                  <figure className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={`http://localhost:8000${postItem.user_image}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div className="flex-1">
                    <ins className="flex items-center space-x-2">
                      <Link
                        to={`/userprofile/${postItem.user_id}`}
                        className="text-black font-bold text-lg sm:text-xl "
                      >
                        {postItem.username}
                      </Link>
                    </ins>
                    <span className="text-gray-500 text-sm">{`Published: ${new Date(
                      postItem.date_created
                    ).toLocaleString()}`}</span>
                  </div>
                </div>
                <div className="post-content mb-4">
                  <p className="text-base mt-4">{postItem.description}</p>
                  {postItem.file &&
                    (postItem.file.endsWith(".mp4") ? (
                      <video
                        controls
                        className="w-full sm:w-[50%] mx-auto object-cover"
                      >
                        <source
                          src={`http://localhost:8000${postItem.file}`}
                          type="video/mp4"
                        />
                      </video>
                    ) : postItem.file.endsWith(".mp3") ||
                      postItem.file.endsWith(".wav") ? (
                      <audio controls className="w-full sm:w-[50%] mx-auto">
                        <source
                          src={`http://localhost:8000${postItem.file}`}
                          type={
                            postItem.file.endsWith(".mp3")
                              ? "audio/mpeg"
                              : "audio/wav"
                          }
                        />
                        Your browser does not support the audio element.
                      </audio>
                    ) : (
                      <img
                        src={`http://localhost:8000${postItem.file}`}
                        alt="Post Content"
                        className="w-full sm:w-[50%] mx-auto object-cover"
                      />
                    ))}
                </div>
                <div className="post-interactions flex flex-col sm:flex-row items-start sm:items-center mb-4">
                  <ul className="flex flex-col sm:flex-row flex-grow space-y-2 sm:space-x-4 sm:space-y-0">
                    <li className="flex items-center text-sm">
                      <span>
                        <MessageCircle strokeWidth={2} size={18} />
                      </span>
                    </li>
                    <li className="flex items-center text-sm">
                      <span>
                        <ThumbsUp strokeWidth={2} size={18} color="#0FFF50" />
                      </span>
                    </li>
                    <li className="flex items-center text-sm">
                      <span>
                        <ThumbsDown strokeWidth={2} size={18} color="#FF0000" />
                      </span>
                    </li>
                    <li className="flex items-center text-sm">
                      <ShareButtons
                        title={postItem.description}
                        url={`http://localhost:8000${postItem.file}`}
                      />
                    </li>
                  </ul>
                </div>

                {/* Comment Area */}
                <div className="coment-area">
                  <ul className="we-comet">
                    {comment
                      .filter((comment) => comment.post_id === postItem.post_id)
                      .map((comment) => (
                        <li
                          key={comment.comment_id}
                          className="bg-white p-4 sm:p-6 rounded-lg shadow-lg shadow-pink-500/50 mt-4"
                        >
                          <div className="post-header md:flex md:flex-row md:items-center flex mb-4">
                            <figure className="w-12 h-12 rounded-full overflow-hidden mr-4">
                              <img
                                src={`http://localhost:8000${comment.user_image}`}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            </figure>
                            <div className="we-comment flex-1">
                              <div className="coment-head flex items-center space-x-2">
                                <ins className="block text-base sm:text-lg font-bold">
                                  <Link
                                    to={`/userprofile/${comment.user_id}`}
                                    className="text-black font-bold text-lg sm:text-xl"
                                  >
                                    {comment.username}
                                  </Link>
                                </ins>
                                <span className="text-gray-500 text-sm">
                                  {new Date(
                                    comment.date_created
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-base">{comment.content}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>

                  {/* Comment Form */}
                  {Token && (
                    <div className="flex flex-col items-center w-full mt-4">
                      <form
                        method="post"
                        onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.target);
                          const postId = postItem.post_id; // Ensure this is correctly set
                          postComment(
                            {
                              content: formData.get("content"),
                            },
                            postId
                          );
                        }}
                        className="flex flex-col items-center w-full max-w-lg"
                      >
                        <textarea
                          name="content"
                          placeholder="Post your comment"
                          {...register("content")}
                          required
                          className=" border-2 p-2 w-full h-16 text-black text-sm mb-2 rounded-lg resize-none"
                        ></textarea>

                        <button
                          type="submit"
                          className="bg-[#ff90e8] font-mono text-white rounded-lg px-4 py-2 mt-2 cursor-pointer text-sm sm:text-base w-full max-w-xs"
                        >
                          Post
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        <Footer />
      </motion.div>
    </div>
  );
};

export default Artcafe;
