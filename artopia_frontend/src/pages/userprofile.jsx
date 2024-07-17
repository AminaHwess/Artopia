import React, { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer.jsx";
import ShareButtons from "../components/ShareButtons/sharebutton.jsx";
import { Link, useParams } from "react-router-dom";
import AxiosInstance from "./Axios/AxiosInstance.jsx";
import ProfileCustom from "./profile_customization/profilecustom.jsx";
import Popup from "reactjs-popup";
import Navbar from "../components/Navbar/Navbar.jsx";
import { Settings } from "lucide-react";

const Userprofile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const loggedInUserId = localStorage.getItem("UserId");

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
      <div className="rounded-lg mx-auto mt-12 p-6 w-full sm:w-[90%]">
        <div className="user-post">
          {/* Loop through the user's posts */}
          {posts.length > 0 ? (
            posts.map((postItem) => (
              <div
                key={postItem.post_id}
                className="post-container bg-white rounded-2xl p-4 sm:p-6 mb-6 shadow-lg  relative"
              >
                <div className="post-header md:flex md:flex-row  md:items-center flex mb-4">
                  <figure className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={`http://localhost:8000${postItem.user_image}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
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
                    ) : (
                      <img
                        src={`http://localhost:8000${postItem.file}`}
                        alt="Post Content"
                        className="w-[400px] mx-auto object-cover"
                      />
                    ))}
                  <p className="text-base mt-8">{postItem.description}</p>
                </div>
                <div className="post-interactions flex flex-col sm:flex-row items-start sm:items-center mb-4">
                  <ul className="flex flex-wrap gap-4 sm:flex-nowrap sm:space-x-4">
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
                <div className="comment-area mt-4 bg-white p-4">
                  <ul className="space-y-4">
                    {postItem.comments && postItem.comments.length > 0 ? (
                      postItem.comments.map((comment, index) => (
                        <li key={index} className="flex items-start space-x-4">
                          <div className="w-1/12">
                            <img
                              src={
                                comment.user_image ||
                                "src/assets/profile_pics/default.jpg"
                              }
                              alt="Comment Avatar"
                              className="rounded-full w-12 h-12"
                            />
                          </div>
                          <div className="flex-1">
                            <div className=" p-4 rounded-lg">
                              <div className="mb-2">
                                <Link
                                  to={`/userprofile/${comment.user_id}`}
                                  className="text-black font-bold"
                                >
                                  {comment.username}
                                </Link>
                                <span className="text-gray-500 text-sm ml-2">
                                  {new Date(
                                    comment.date_created
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-gray-800">{comment.comment}</p>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <p>No comments available</p>
                    )}
                  </ul>
                  {/* Comment Form */}
                  {token && (
                    <div className="flex flex-col items-center w-full mt-4">
                      <form
                        method="post"
                        onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.target);
                          postComment(postItem.post_id, {
                            comment: formData.get("comment"),
                          });
                        }}
                        className="flex flex-col items-center w-full max-w-lg"
                      >
                        <textarea
                          name="comment"
                          placeholder="Post your comment"
                          required
                          className=" border-2 p-2 w-full h-16 text-black text-sm mb-2 rounded-lg resize-none"
                        ></textarea>
                        <button
                          type="submit"
                          className="bg-[#6d0666] text-white rounded-lg px-4 py-2 mt-2 cursor-pointer text-sm sm:text-base w-full max-w-xs"
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
