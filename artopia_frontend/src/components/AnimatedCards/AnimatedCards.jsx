import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AnimatedCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      <Link to="/about" className="therapy-container">
        <motion.div
          className="card bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-105"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="arttherapy.png" className="card-image w-70 h-40 object-cover p-3 ml-20" alt="Art Therapy" />
          <div className="card-text p-4">
            <h2 className="text-xl font-bold mb-3">About Us</h2>
            <p className="text-gray-700 font-mono">
            Discover our passion for creativity and expression through a curated collection of art that inspires, captivates, and transforms.
            </p>
          </div>
        </motion.div>
      </Link>

      <Link to="/artcafe" className="wisdom">
        <motion.div
          className="card bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-105"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="creativecafe.png" className="card-image w-70 h-40 object-cover p-3 ml-20" alt="Creative Cafe" />
          <div className="card-text p-4">
            <h2 className="text-lg font-bold mb-3">Creative Café</h2>
            <p className="text-gray-700 font-mono">
              Join our vibrant community of artists, where creativity thrives and advice flows like paint on canvas!
            </p>
          </div>
        </motion.div>
      </Link>

      <Link to="/contactus" className="eduart">
        <motion.div
          className="card bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-105"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="eduart.png" className="card-image w-70 h-40 object-cover p-3 ml-20" alt="Educational Art" />
          <div className="card-text p-4">
            <h2 className="text-lg font-bold mb-3">Have a Question? We're All Ears!</h2>
            <p className="text-gray-700 font-mono">
            Send us your questions about our art, and we will paint a clear picture for you. Our team is eager to help you explore the world of art!
            </p>
          </div>
        </motion.div>
      </Link>

      <Link to="/market" className="market">
        <motion.div
          className="card bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-105"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="artmarket.png" className="card-image w-70 h-40 object-cover p-3 ml-20" alt="Art Market" />
          <div className="card-text p-4">
            <h2 className="text-lg font-bold mb-3">Artistic Avenue</h2>
            <p className="text-gray-700 font-mono">
              Discover a whimsical marketplace where creativity blooms and unique art finds a home!
            </p>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default AnimatedCards;
