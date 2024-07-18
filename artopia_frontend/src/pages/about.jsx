import React from "react";
import { motion, useScroll } from "framer-motion";
import Navbar from "../components/Navbar/Navbar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, Heading, Text } from "@chakra-ui/react";
import "@fontsource-variable/source-code-pro";
import Button from "@mui/material/Button";
import Footer from "../components/Footer/Footer.jsx";

const About = () => {
  const { scrollYProgress } = useScroll();
  return (
    <div className="about">
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1 }}
      >
        <Navbar />
        {/* header */}

        <h2 className="md:text-5xl text-3xl text-[#ff90e8] font-serif font-bold text-center"> Welcome to Artopia: A Creative Haven for Artists </h2>

        <div>
          {/* Carousel Images Introducing The Website Features and a Box with more Details */}
          <div className="flex justify-center">
            <div className="md:w-1/2 mt-[30px] rounded-[15px] md:h-[530px]">
              <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={true}
                interval={3000}
                className="transition-all duration-[0.25s] ease-in-out"
              >
                <div>
                  <img
                    src="/slider/educationalartposts.JPG"
                    alt="Image 1"
                    className="w-full h-auto block mx-auto brightness-[0.9] contrast-[1.9] 
                    image-rendering-auto rounded-[15px] object-cover mt-[37px]"
                  />
                </div>
                <div>
                  <img
                    src="/slider/arttherapy.JPG"
                    alt="Image 2"
                    className="w-full h-auto block mx-auto brightness-[0.9] contrast-[1.9] 
                    image-rendering-auto rounded-[15px] object-cover mt-[37px]"
                  />
                </div>
                <div>
                  <img
                    src="/slider/communityinteraction.JPG"
                    alt="Image 3"
                    className="w-full h-auto block mx-auto brightness-[0.9] contrast-[1.9] 
                    image-rendering-auto rounded-[15px] object-cover mt-[37px]"
                  />
                </div>
                <div>
                  <img
                    src="/slider/showcaseartwork.JPG"
                    alt="Image 4"
                    className="w-full h-auto block mx-auto brightness-[0.9] contrast-[1.9] 
                    image-rendering-auto rounded-[15px] object-cover mt-[37px]"
                  />
                </div>
                <div>
                  <img
                    src="/slider/sellingart.JPG"
                    alt="Image 5"
                    className="w-full h-auto block mx-auto brightness-[0.9] contrast-[1.9] image-rendering-auto rounded-[15px] object-cover mt-[37px]"
                  />
                </div>
              </Carousel>
              <style jsx>{`
                .carousel .control-arrow {
                  display: none;
                }
                .carousel .control-dots .dot {
                  background: #000;
                  width: 10px;
                  height: 10px;
                }
                .carousel .control-dots .dot.selected {
                  background: #df3ebf;
                }
              `}</style>
            </div>
          </div>
          {/* The Box containing information about the website */}

          <div id="features_section" className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                className="bg-white rounded-lg p-6 shadow-md text-center transform transition-transform duration-200 hover:scale-105 cursor-pointer"
              >
                <img
                  src="/artists.png"
                  className="card-image w-70 object-cover p-3 mx-auto d-block"
                  alt="Showcase Art"
                />
                <h2 className="text-xl font-semibold mb-2">Mission Statement</h2>
                <p className="text-gray-700">
                At Artopia, our mission is to create a vibrant and inclusive
              community where artists of all levels can share their work, learn
              from one another, and find support and inspiration.
                </p>
              </div>
              <div
                className="bg-white rounded-lg p-6 shadow-md text-center transform transition-transform duration-200 hover:scale-105 cursor-pointer"
              >
                <img
                  src="/community.png"
                  className="card-image w-70 object-cover p-3 mx-auto d-block"
                  alt="Connect"
                />
                <h2 className="text-xl font-semibold mb-2">Community Values</h2>
                <p className="text-gray-700">
                We believe in the power of art to connect people, foster
              creativity, and promote well-being. Our community values
              inclusivity, respect, and mutual support.
                </p>
              </div>
              <div
                className="bg-white rounded-lg p-6 shadow-md text-center transform transition-transform duration-200 hover:scale-105 cursor-pointer"
              >
                <img
                  src="/onlineart.png"
                  className="card-image w-70 object-cover p-3 mx-auto d-block"
                  alt="Market"
                />
                <h2 className="text-xl font-semibold mb-2">Features Overview:</h2>
                <p className="text-gray-700">
                Artopia offers a range of features to support our members,
              including the ability to post and share artwork, participate in
              art therapy discussions, access educational content, and sell
              their art pieces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default About;
