import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../../pages/Axios/AxiosInstance";

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const [userId, setUserId] = useState(localStorage.getItem("UserId"));
  const navigate = useNavigate();

  const logoutUser = () => {
    AxiosInstance.post("logoutall/", {}).then(() => {
      localStorage.removeItem("Token");
      localStorage.removeItem("UserId");
      setToken(null);
      setUserId(null);
      navigate("/");
    });
  };
  return (
    <div className="relative top-0 left-0 w-full bg-transparent z-10 p-2.5 flex justify-center items-center">
      <nav className="flex flex-col md:flex-row justify-between items-center w-full max-w-screen-lg">
        <div className="flex items-center mb-2.5 md:mb-0">
          <Link to="/" className="flex items-center">
            <img
              src="/logonobg.png"
              alt="Logo"
              className="h-15 w-auto mr-10"
              style={{ height: "60px" }}
            />
          </Link>
        </div>
        <ul className="list-none flex flex-col md:flex-row justify-center items-center">
          <li className="mb-2 md:mb-0 md:mr-5">
            <Link to="/about">
              <button className="text-black cursor-pointer rounded-md px-8 py-3 bg-white transition duration-200 font-mono font-bold hover:text-white hover:bg-pink-400 hover:transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_white] active:transform-none active:shadow-none">
                About
              </button>
            </Link>
          </li>
          <li className="mb-2 md:mb-0 md:mr-5">
            <Link to="/artcafe">
              <button className="text-black cursor-pointer rounded-md px-8 py-3 bg-white transition duration-200 font-mono font-bold hover:text-white hover:bg-pink-400 hover:transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_white] active:transform-none active:shadow-none">
                Creative Café
              </button>
            </Link>
          </li>
          <li className="mb-2 md:mb-0 md:mr-5">
            <Link to="/market">
              <button className="text-black cursor-pointer rounded-md px-8 py-3 bg-white transition duration-200 font-mono font-bold hover:text-white hover:bg-pink-400 hover:transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_white] active:transform-none active:shadow-none">
                Artistic Avenue
              </button>
            </Link>
          </li>
          {!token && (
            <>
            <li className="mb-2 md:mb-0 md:mr-5">
              <Link to="/login">
                <button className="text-black cursor-pointer rounded-md px-8 py-3 bg-white transition duration-200 font-mono font-bold hover:text-white hover:bg-pink-400 hover:transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_white] active:transform-none active:shadow-none">
                  Login
                </button>
              </Link>
            </li>
            <li className="mb-2 md:mb-0 md:mr-5">
              <Link to="/signup">
                <button className="text-black cursor-pointer rounded-md px-8 py-3 bg-white transition duration-200 font-mono font-bold hover:text-white hover:bg-pink-400 hover:transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_white] active:transform-none active:shadow-none">
                  Sign Up
                </button>
              </Link>
            </li>
            </>
          )}
          {token && (
            <>
              <li className="mb-2 md:mb-0 md:mr-5">
                <Link to={`/userprofile/${userId}`}>
                  <button className="text-black cursor-pointer rounded-md px-8 py-3 bg-white transition duration-200 font-mono font-bold hover:text-white hover:bg-pink-400 hover:transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_white] active:transform-none active:shadow-none">
                    My Profile
                  </button>
                </Link>
              </li>
              <li className="mb-2 md:mb-0">
                <Link to="" onClick={logoutUser}>
                  <button className="text-black cursor-pointer rounded-md px-8 py-3 bg-white transition duration-200 font-mono font-bold hover:text-white hover:bg-pink-400 hover:transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_white] active:transform-none active:shadow-none">
                    Logout
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
