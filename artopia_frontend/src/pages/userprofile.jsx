import React, { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer.jsx";
import ShareButtons from "../components/ShareButtons/sharebutton.jsx";
import { Link, useParams } from "react-router-dom";
import AxiosInstance from "./Axios/AxiosInstance.jsx";
import ProfileCustom from "./profile_customization/profilecustom.jsx";
import Popup from "reactjs-popup";
import Navbar from "../components/Navbar/Navbar.jsx";
import { Settings } from "lucide-react";
import { MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";

const Userprofile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const [comment, setComment] = useState([]);
  const loggedInUserId = localStorage.getItem("UserId");
  const Token = localStorage.getItem("Token");

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
      window.location.reload(); // Check the response from the server
    } catch (error) {
      console.error(
        "Error submitting comment:",
        error.response ? error.response.data : error.message // More specific error message
      );
    }
  };

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

  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      try {
        // Fetch the user profile
        const profileResponse = await AxiosInstance.get(`/profile/${userId}/`);
        setProfile(profileResponse.data);

        // Fetch the user's posts with filtering and sorting
        const postsResponse = await AxiosInstance.get(`posts/artcafeposts/`);
        const filteredAndSortedPosts = postsResponse.data
          .filter((post) => post.user_id == userId)
          .sort((a, b) => b.post_id - a.post_id);
        setPosts(filteredAndSortedPosts);
      } catch (error) {
        console.error("Error fetching profile or posts:", error);
        setError(error.message || "Error fetching profile or posts!");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndPosts();
  }, [userId]);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Navbar />
      <div className="container-fluid p-0">
        <div
          className="md:w-2/6 w-4/6 mx-auto mt-12 p-0 relative bg-[#fdfdfd] rounded-lg sm:w-[50%] sm:mx-auto p-4 sm:p-6 
        shadow-lg"
        >
          <div className="p-4 flex flex-col sm:flex-row items-start justify-between">
            <div className="p-5 -mt-5">
              <img
                src={profile.image}
                alt="Profile"
                className="rounded-full bg-white shadow-lg md:w-30 h-30 mx-auto object-cover"
              />
            </div>
            {token && loggedInUserId === userId && (
              <Popup
                trigger={
                  <button className="absolute left-1 top-0 mt-2 mr-2 ml-3  rounded-md p-2  transition-colors duration-300">
                    <Settings strokeWidth={2} color="#ff90e8" />
                  </button>
                }
                modal
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  padding: "20px", // Padding for mobile
                  borderRadius: "15px", // Border radius for mobile
                  zIndex: "1000",
                  width: "90%", // Width for mobile
                  maxWidth: "500px", // Maximum width
                }}
                overlayStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Semi-transparent background
                }}
              >
                <span>
                  <ProfileCustom />
                </span>
              </Popup>
            )}
            <div className="pl-4 flex-grow">
              <h2 className="text-black md:text-2xl text-xl mb-2 font-serif font-bold">
                {profile.username}
              </h2>
              <p className="text-black text-lg indent-5 mt-5 max-w-xs ml-[-2px] font-cursive">
                {profile.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Post Box */}
      <div className="md:mx-[250px] mt-12">
        <div className="user-post">
          {/* Loop through the user's posts */}
          {posts.length > 0 ? (
            posts.map((postItem) => (
              <div
                key={postItem.post_id}
                className="post-container bg-white rounded-lg p-4 sm:p-6 mb-6 shadow-xl relative"
              >
                {Token && loggedInUserId === userId && (
                  <button
                    type="button"
                    onClick={() => deletepost(postItem.post_id)}
                    className="md:ml-[850px] font-mono bg-[#ff90e8] text-white rounded-lg px-4 sm:px-5 py-2.5 cursor-pointer text-sm sm:text-base"
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
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/userprofile/${postItem.user_id}`}
                        className="text-black font-bold text-lg sm:text-xl"
                      >
                        {postItem.username}
                      </Link>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {`Published: ${new Date(
                        postItem.date_created
                      ).toLocaleString()}`}
                    </span>
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

                  <p className="text-base mt-8">{postItem.description}</p>
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
                  {token && (
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
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Userprofile;
