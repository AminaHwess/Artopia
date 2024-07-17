import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { motion, useScroll } from "framer-motion";
import { useCart } from "react-use-cart";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useForm } from "react-hook-form";
import Footer from "../components/Footer/Footer.jsx";
import AxiosInstance from "./Axios/AxiosInstance.jsx";
import { CirclePlus, Image, DiamondPlus } from 'lucide-react'

const Market = () => {
  const { addItem } = useCart();
  const Token = localStorage.getItem("Token");
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const submission = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      await AxiosInstance.post("market/product/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${Token}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error posting your product:", error);
      setError("Error posting your product");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await AxiosInstance.get("market/products/");
        console.log("Products fetched: ", response.data);
        setProducts(response.data.sort((a, b) => b.product_id - a.product_id));
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const { scrollYProgress } = useScroll();

  // JavaScript function to allow only numbers in textarea
  const handleTextareaInput = (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
  };

  // Function to handle Add to Cart button click
  const handleAddToCart = (product) => {
    addItem({
      id: product.product_id,
      name: product.name,
      price: product.price,
      image: `http://localhost:8000${product.image}`,
      quantity: 1,
    });
  };  

  return (
    <div className="market">
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <Navbar />

      <section className="product_section layout_padding">
        <div className="container">
          <div className="md:text-7xl sm:text-6xl text-5xl text-[#ff90e8] font-serif font-bold md:py-6 flex justify-center">
            <h2>Our Products</h2>
          </div>
          {Token && (
            <>
              <Popup
                trigger={
                  <button className="buttonpopup ml-8">
                    <CirclePlus strokeWidth={3} color="#ff90e8" />
                  </button>
                }
                modal
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  padding: "20px",  // Reduced padding for mobile
                  borderRadius: "15px",  // Slightly smaller border radius for mobile
                  zIndex: "1000",
                  width: "90%",  // Increased width for mobile
                  maxWidth: "500px",  // Maximum width to ensure it doesn’t get too large on larger screens
                }}
              >
                <span>
                  <form
                    method="post"
                    onSubmit={handleSubmit(submission)}
                    encType="multipart/form-data"
                  >
                    <div className="relative mt-3 font-mono text-gray-400">
                      <h1 className="text-center md:text-3xl text-2xl font-bold font-serif">
                        SELL <span className="text-[#ff90e8]">YOUR</span> ART
                      </h1>
                      <Image strokeWidth={3} color="#ff90e8" size={30} className="cursor-pointer" />
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        {...register("image")}
                        required
                      />
                    </div>

                    <textarea
                      rows="2"
                      placeholder="Price"
                      className="textareapop3 w-full relative z-10 rounded mt-8 font-mono"
                      onInput={handleTextareaInput}
                      {...register("price")}
                      required
                    ></textarea>

                    <textarea
                      rows="2"
                      placeholder="Write Your Product's Name"
                      className="textareapop3 w-full relative z-10 rounded font-mono"
                      {...register("name")}
                      required
                    ></textarea>
                    <textarea
                      rows="2"
                      placeholder="Write Your Product's Description"
                      className="textareapop2 w-full relative z-10 rounded font-mono"
                      {...register("description")}
                      required
                    ></textarea>
                    <button
                      type="submit"
                      className="relative top-[10px] md:ml-40 ml-20 bg-pink-500 text-white py-2 px-12 rounded hover:bg-pink-600 font-mono"
                    >
                      Post
                    </button>
                  </form>
                </span>
              </Popup>
              <p className="popupp ml-3 relative bottom-1 font-serif text-lg font-extrabold p-1 inline text-[#ff90e8]">
                Sell Your Art
              </p>
            </>
          )}
          <div className="row flex flex-wrap justify-between w-full ">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : products.length === 0 ? (
              <p>No products available</p>
            ) : (
              products.map((product) => (
                <div
  key={product.product_id}
  className="col-12 lg:col-sm-6 lg:col-lg-4 mb-5"
>
  <div className="box inline-block flex-col items-center p-4 mt-4 relative overflow-hidden w-full bg-white rounded-lg shadow-md">
    <div className="img-box bg-gray-200 w-full h-[275px] flex justify-center items-center relative p-4 group">
      <div className="absolute top-0 left-0 flex items-center p-2 bg-white rounded-full shadow-md">
        <figure className="w-[50px] sm:w-[50px] rounded-full overflow-hidden mb-2 sm:mb-0 sm:mr-4">
          <img
            src={`http://localhost:8000${product.user_image}`}
            alt="Profile"
            className="rounded-full h-[30px] w-[30px] md:ml-3"
          />
        </figure>
        <p className="text-lg font-semibold">{product.username}</p>
      </div>
      <img
        src={`http://localhost:8000${product.image}`}
        alt={product.name}
        className="h-[200px] max-w-full object-cover rounded-lg"
      />
      {Token && (
        <button
          className="add_cart_btn w-[60px] h-[60px] text-white absolute bottom-2 left-1/2 
            transform translate-x-[-50%] transition-colors duration-300 opacity-0 group-hover:opacity-100 
            group-hover:bg-pink-500 rounded-full flex justify-center items-center"
          onClick={() => handleAddToCart(product)}
        >
          <DiamondPlus size={24} color="#ffffff" />
        </button>
      )}
    </div>
    <div className="detail-box pt-4 flex-col w-full">
      <h5 className="text-xl font-bold mb-2">{product.name}</h5>
      <h5 className="text-base mb-2">{product.description}</h5>
      <div className="product_info flex justify-between items-center">
        <h5 className="font-bold text-lg">
          <span>$</span> {product.price}
        </h5>
        <div className="star_container text-[#f2b01e] flex items-center">
          {[...Array(5)].map((_, index) => (
            <i key={index} className="fa fa-star" aria-hidden="true"></i>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>

              ))
            )}
          </div>

          {Token && (
            <div className="btn_box flex justify-center mt-12">
              <a
                href="/cart"
                className="view_more-link inline-block py-2 px-12 bg-pink-500 text-white rounded border border-pink-600 transition-colors duration-300 
                hover:bg-transparent hover:text-pink-500"
              >
                View Cart
              </a>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Market;
