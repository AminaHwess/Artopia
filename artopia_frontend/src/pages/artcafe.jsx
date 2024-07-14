import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import ShareButtons from "../components/ShareButtons/sharebutton.jsx";
import Footer from "../components/Footer/Footer.jsx";
import AxiosInstance from "./Axios/AxiosInstance.jsx";
import { useForm } from "react-hook-form";

const Artcafe = () => {
  const Token = localStorage.getItem("Token");
  const { register, handleSubmit } = useForm();
  const { scrollYProgress } = useScroll();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      window.location.reload()
    } catch (error) {
      console.error("Error posting new art cafe post:", error);
      setError("Error posting new art cafe post");
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
          <div className="post-form-container mx-4 sm:mx-auto max-w-full sm:max-w-3xl bg-white p-4 sm:p-5 rounded-lg shadow-lg shadow-pink-500/50 mb-10">
            <form
              method="post"
              onSubmit={handleSubmit(submission)}
              encType="multipart/form-data"
            >
              <textarea
                rows="2"
                placeholder="Write something"
                id="textarea"
                {...register("description")}
                required
                className="border-[#6d0666] border-2 p-3 sm:p-5 w-full rounded-lg resize-none text-base font-sans"
              />
              <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
                <div className="flex flex-wrap gap-4 mb-4 sm:mb-0">
                  <label className="relative w-[32px] h-[32px]">
                    <i className="material-icons text-[#6d0666] text-xl sm:text-2xl cursor-pointer">
                      music_note
                    </i>
                    <input
                      type="file"
                      {...register("music")}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                  <label className="relative w-[32px] h-[32px]">
                    <i className="material-icons text-[#6d0666] text-xl sm:text-2xl cursor-pointer">
                      image
                    </i>
                    <input
                      type="file"
                      {...register("image")}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                  <label className="relative w-[32px] h-[32px]">
                    <i className="material-icons text-[#6d0666] text-xl sm:text-2xl cursor-pointer">
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
                  className="bg-[#6d0666] text-white rounded-lg px-4 sm:px-5 py-2.5 cursor-pointer text-sm sm:text-base"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="post-list bg-[#fdfdfd] rounded-lg w-full sm:w-[90%] mx-4 sm:mx-auto p-4 sm:p-6 shadow-lg shadow-pink-500/50">
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
                className="post-container bg-white rounded-lg p-4 sm:p-6 mb-6 shadow-lg shadow-pink-500/50"
              >
                <div className="post-header flex flex-col sm:flex-row items-start sm:items-center mb-4">
                  <figure className="w-[30%] sm:w-[10%] rounded-full overflow-hidden mb-2 sm:mb-0 sm:mr-4">
                    <img
                      src={`http://localhost:8000${postItem.user_image}`}
                      alt="Profile"
                      className="rounded-full h-[50px] w-[50px]"
                    />
                  </figure>
                  <div className="flex-1">
                    <ins className="block text-base sm:text-lg font-bold">
                      <Link
                        to={`/userprofile/${postItem.user_id}`}
                        className="no-underline text-black "
                      >
                        {postItem.username}
                      </Link>
                    </ins>
                    <span className="text-gray-500 text-sm">{`published: ${new Date(
                      postItem.date_created
                    ).toLocaleString()}`}</span>
                  </div>
                </div>
                <div className="post-content mb-4">
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
                    ) : (
                      <img
                        src={`http://localhost:8000${postItem.file}`}
                        alt="Post Content"
                        className="w-full sm:w-[50%] mx-auto object-cover"
                      />
                    ))}
                  <p className="text-base mt-4">{postItem.description}</p>
                </div>
                <div className="post-interactions flex flex-col sm:flex-row items-start sm:items-center mb-4">
                  <ul className="flex flex-col sm:flex-row flex-grow space-y-2 sm:space-x-4 sm:space-y-0">
                    <li className="flex items-center text-sm">
                      <span
                        className="text-lg font-light cursor-pointer hover:scale-110 transition-transform"
                        title="Comments"
                      >
                        <i className="fa fa-comment"></i>
                        <ins className="ml-1">{postItem.comments_count}</ins>
                      </span>
                    </li>
                    <li className="flex items-center text-sm">
                      <span
                        className="text-green-500 cursor-pointer hover:scale-110 transition-transform"
                        title="Like"
                      >
                        <i className="ti ti-heart"></i>
                        <ins className="ml-1">{postItem.likes_count}</ins>
                      </span>
                    </li>
                    <li className="flex items-center text-sm">
                      <span
                        className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                        title="Dislike"
                      >
                        <i className="ti ti-heart-broken"></i>
                        <ins className="ml-1">{postItem.dislikes_count}</ins>
                      </span>
                    </li>
                    <li className="flex items-center text-sm">
                      <ShareButtons />
                    </li>
                  </ul>
                </div>

                {/* Comment Area */}
                <div className="coment-area">
                  <ul className="we-comet">
                    {postItem.comments && postItem.comments.length > 0 ? (
                      postItem.comments.map((comment, index) => (
                        <li key={index}>
                          <ul>
                            <li>
                              <div className="comet-avatar">
                                <img
                                  src={
                                    comment.user_image ||
                                    "src/assets/profile_pics/default.jpg"
                                  }
                                  alt="Comment Avatar"
                                />
                              </div>
                              <div className="we-comment">
                                <div className="coment-head">
                                  <h5>
                                    <Link
                                      to={`/userprofile/${comment.user_id}`}
                                      className="friendname"
                                    >
                                      {comment.username}
                                    </Link>
                                  </h5>
                                  <span>
                                    {new Date(
                                      comment.date_created
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <p>{comment.text}</p>
                              </div>
                            </li>
                          </ul>
                        </li>
                      ))
                    ) : (
                      <p>No comments available</p>
                    )}
                  </ul>
                  {/* Comment Form */}
                  {Token && (
                    <div className="flex flex-col items-center w-full mt-4">
                      <form
                        onSubmit={handleSubmit((data) =>
                          postComment(postItem.post_id, data)
                        )}
                        className="flex flex-col items-end w-full max-w-full"
                      >
                        <textarea
                          {...register("comment")}
                          required
                          placeholder="Add a comment..."
                          className="border-[#6d0666] border-2 p-2 w-full rounded-lg resize-none text-base font-sans"
                        />
                        <button
                          type="submit"
                          className="bg-[#6d0666] text-white rounded-lg px-4 py-2 mt-2 cursor-pointer text-sm sm:text-base w-[10%] self-end"
                        >
                          Submit
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
