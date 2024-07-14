import React from "react";
import { motion, useScroll } from "framer-motion";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer.jsx";
import AnimatedCards from "../components/AnimatedCards/AnimatedCards.jsx";
import "@fontsource-variable/grandstander";

const Home = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="home">
      <motion.div
        className="fixed top-0 left-0 right-0 h-2.5 bg-pink-600 transform origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1 }}
      >
        <Navbar />
        <div className='text-black'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <h1 className='md:text-7xl sm:text-6xl text-5xl text-[#ff90e8] font-serif font-bold md:py-6 '>
         WELCOME TO ARTOPIA
        </h1>
        <p className='md:text-2xl text-xl font-bold font-serif text-black'>A place where you can find your favorite art pieces. 👩🏻‍🎨</p>
      </div>
    </div>
        <AnimatedCards />
        <Footer />
      </motion.div>
    </div>
  );
};

export default Home;
