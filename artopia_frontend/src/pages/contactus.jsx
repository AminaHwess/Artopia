import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

const Contactus = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleActive = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <Navbar />
      <section id="contsec" className="relative px-4 sm:px-6 lg:px-8 ">
        <div className="w-full max-w-[36.5rem] sm:max-w-[80rem] mx-auto flex flex-col gap-[clamp(3rem,6vw,5rem)] lg:flex-row lg:justify-between lg:gap-4">
          <form className="w-full max-w-[40.625rem] p-[clamp(2rem,5.18vw,3rem)] sm:p-[clamp(2rem,5.18vw,3rem)] bg-[#f7f7f7] flex flex-wrap gap-3 items-center">
            <div className="w-full flex flex-col items-start">
              <span className="text-[#cf2bc9] text-[clamp(0.8125rem,1.6vw,1rem)] leading-4 tracking-wider uppercase font-bold mb-1">
                Contact Us
              </span>
              <h2 className="text-[#000000] text-[clamp(1.9375rem,3.9vw,3.0625rem)] font-extrabold leading-6 max-w-[23ch] mb-[1.75rem]">
                Send Us An Inquiry
              </h2>
            </div>
            <label className="w-full flex flex-col gap-1 text-[#000000] text-[clamp(0.875rem,1.5vw,1rem)] font-medium">
              Name
              <input
                className="w-full h-[3.5rem] pl-[1.5rem] text-[#000000] bg-[#fff] border-none box-border text-[1rem] placeholder-[#767676] opacity-60"
                required
                type="text"
                name="name"
                placeholder="Name"
              />
            </label>
            <label className="w-full flex flex-col gap-1 text-[#000000] text-[clamp(0.875rem,1.5vw,1rem)] font-medium">
              Email
              <input
                className="w-full h-[3.5rem] pl-[1.5rem] text-[#000000] bg-[#fff] border-none box-border text-[1rem] placeholder-[#767676] opacity-60"
                required
                type="email"
                name="email"
                placeholder="Email"
              />
            </label>
            <label className="w-full flex flex-col gap-1 text-[#000000] text-[clamp(0.875rem,1.5vw,1rem)] font-medium">
              Message
              <textarea
                className="w-full min-h-[7.5rem] pt-[1.5rem] text-[#000000] bg-[#fff] border-none box-border text-[1rem] placeholder-[#767676] opacity-60"
                required
                name="Message"
                placeholder="Write message..."
              ></textarea>
            </label>
            <button className="w-full min-w-[9.375rem] px-[1.5rem] py-[0.5rem] bg-[#cf2bc9] text-[#1a1a1a] text-[1rem] font-bold rounded-md hover:bg-[#3c0225] hover:text-[#eeeded] relative overflow-hidden transition-colors duration-300 ease-in-out">
              Send Question
              <span className="absolute top-0 left-0 h-full w-0 bg-[#3c0225] transition-width duration-300 ease-in-out z-[-1]"></span>
            </button>
          </form>
          <div className="w-full flex flex-col gap-4">
            <span className="text-[#cf2bc9] text-[clamp(0.8125rem,1.6vw,1rem)] leading-4 tracking-wider uppercase font-bold mb-1">
              Asked Questions
            </span>
            <h2 className="text-[#000000] text-[clamp(1.9375rem,3.9vw,3.0625rem)] font-extrabold leading-[1.4] max-w-[23ch] mb-[2rem] text-left">
              Frequently Asked <br /> Questions
            </h2>

            <ul className="w-full flex flex-col gap-2">
              {[0, 1].map((index) => (
                <li
                  key={index}
                  className={`w-full border-b border-[#e8e8e8] transition-border-colors duration-300 ease-in-out ${
                    activeIndex === index ? "border-[#cf2bc9]" : ""
                  }`}
                >
                  <button
                    className={`w-full text-[#000000] text-[1rem] font-bold text-left flex items-center gap-2 relative transition-colors duration-300 ease-in-out ${
                      activeIndex === index ? "text-[#cf2bc9]" : ""
                    }`}
                    onClick={() => toggleActive(index)}
                  >
                    <span className="w-[0.5rem] h-[0.125rem] bg-[#000000] absolute top-[45%] right-[1.5rem] transform rotate-45 transition-transform duration-500 ease-in-out"></span>
                    <span className="w-[0.5rem] h-[0.125rem] bg-[#000000] absolute top-[45%] right-[1.3125rem] transform -rotate-45 transition-transform duration-500 ease-in-out"></span>
                    <span className="w-4/5">
                      Where can I promote my artwork?
                    </span>
                  </button>
                  <p
                    className={`w-4/5 text-[clamp(0.875rem,1.5vw,1rem)] leading-6 text-[#000000] overflow-hidden transition-opacity duration-300 ease-in-out ${
                      activeIndex === index
                        ? "opacity-100 py-[clamp(1rem,2vw,1.5rem)]"
                        : "opacity-0 py-0"
                    }`}
                  >
                    Our platform includes a marketplace where artists can sell
                    their original pieces, connecting with buyers who appreciate
                    and support their work
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contactus;
