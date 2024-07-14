import React from "react";

const Footer = () => {
  return (
    <footer className="bg-transparnt text-white font-mono py-8 px-4 relative">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-8">
        <div>
          <img src="\logonobg.png" alt="" />
          <p className="py-3 font-mono text-gray-500">
            Join a vibrant community where artists can showcase their work,
            connect with fellow creatives, sell their art, explore art therapy,
            and access educational content. Discover your artistic journey with
            Artopia.
          </p>
      
        </div>
        <div className="lg:col-span-2 flex justify-evenly text-black">
          <div className="font-mono md:text-2xl text-lg ml-3">
            <h6 className="text-[#ff90e8] font-bold" >Browse</h6>
            <ul>
              <a href="/artcafe">
                <li className="py-2 text-sm">Creative Café</li>
              </a>
              <a href="/market">
                <li className="py-2 text-sm">Artistic Avenue</li>
              </a>
            </ul>
          </div>
          <div className="font-mono md:text-2xl text-lg ml-3">
            <h6 className="text-[#ff90e8] font-bold">About Us</h6>
            <ul>
              <a href="/about">
                <li className="py-2 text-sm">About</li>
              </a>
            </ul>
          </div>
          <div className="font-mono md:text-2xl text-lg ml-3">
            <h6 className="text-[#ff90e8] font-bold" >Contact Us</h6>
            <ul>
              <a href="/contactus">
                <li className="py-2 text-sm">Send Us An Inquiry</li>
              </a>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:justify-start max-w-[1240px] mx-auto my-6 px-2 ">
        
      </div>
      <p className="text-center text-gray-400 absolute bottom-4 left-0 right-0">
        &copy; 2024 ARTOPIA 
      </p>
    </footer>
  );
};

export default Footer;
