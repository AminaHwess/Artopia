import React, { useState } from "react";
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
    <div className="relative top-0 left-0 w-full bg-transparent z-10 p-3.5 flex items-center">
      <nav className="flex flex-col md:flex-row justify-between items-center w-full max-w-screen-xl">
        <div className="flex items-center mb-2.5 md:mb-0">
          <Link to="/" className="flex items-center">
            <img
              src="/logonobg.png"
              alt="Logo"
              className="h-15 w-auto"
              style={{ height: "60px" }}
            />
          </Link>
        </div>
        <ul className="list-none flex flex-wrap md:flex-row justify-center items-center gap-2 md:gap-5">
          <li>
            <Link to="/about">
              <button className="text-black cursor-pointer rounded-md px-3 py-3 bg-white transition 
              duration-200 font-mono font-bold hover:text-white hover:bg-pink-400 hover:transform hover:-translate-x-1 
              hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_white] active:transform-none active:shadow-none">
                About
              </button>
            </Link>
          </li>
          <li>
            <Link to="/artcafe">
              <button className="text-black cursor-pointer rounded-md md:px-8 px-3 py-3 bg-white transition duration-200 font-mono font-bold hover:text-white hover:bg-pink-400 hover:transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_white] active:transform-none active:shadow-none">
                Creative Café
              </button>
            </Link>
          </li>
          <li>
            <Link to="/market">
              <button className="text-black cursor-pointer rounded-md md:px-8 px-3 py-3 bg-white transition duration-200 font-mono font-bold hover:text-white hover:bg-pink-400 hover:transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_white] active:transform-none active:shadow-none">
                Artistic Avenue
              </button>
            </Link>
          </li>
          {!token && (
            <>
              <li>
                <Link to="/login">
                  <button className="text-black cursor-pointer rounded-md md:px-8 px-3 py-3 bg-white transition duration-200 font-mono font-bold hover:text-white hover:bg-pink-400 hover:transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_white] active:transform-none active:shadow-none">
                    Login
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <button className="text-black cursor-pointer rounded-md md:px-8 px-3 py-3 bg-white transition duration-200 font-mono font-bold hover:text-white hover:bg-pink-400 hover:transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_white] active:transform-none active:shadow-none">
                    Sign Up
                  </button>
                </Link>
              </li>
            </>
          )}
          {token && (
            <>
              <li>
                <Link to={`/userprofile/${userId}`}>
                  <button className="text-black cursor-pointer rounded-md md:px-8 px-3 py-3 bg-white transition duration-200 font-mono font-bold hover:text-white hover:bg-pink-400 hover:transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_white] active:transform-none active:shadow-none">
                    My Profile
                  </button>
                </Link>
              </li>
              <li>
                <Link to="" onClick={logoutUser}>
                  <button className="text-black cursor-pointer rounded-md md:px-8 px-3 py-3 bg-white transition duration-200 font-mono font-bold hover:text-white hover:bg-pink-400 hover:transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_white] active:transform-none active:shadow-none">
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
