import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { motion, useScroll } from "framer-motion";
import { useCart } from "react-use-cart";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useForm } from "react-hook-form";
import Footer from "../components/Footer/Footer.jsx";
import AxiosInstance from "./Axios/AxiosInstance.jsx";

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
      quantity: 1, // Default to 1 item when adding to cart
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
          <div className="heading_container heading_center mb-6 text-center font-sans text-lg">
            <h2>Our Products</h2>
          </div>
          {Token && (
            <>
              <Popup
                trigger={
                  <button className="buttonpopup">
                    <img
                      className="buttonimg w-10 mr-24 mb-2 bg-pink-500 rounded-lg"
                      src="src/assets/plus.png"
                    />
                  </button>
                }
                modal
                contentStyle={{
                  backgroundColor: "#D492DC",
                  padding: "20px",
                  borderRadius: "10px",
                  zIndex: "1000",
                  width: "30%",
                }}
              >
                <span>
                  <form
                    method="post"
                    onSubmit={handleSubmit(submission)}
                    encType="multipart/form-data"
                  >
                    <div className="relative">
                      <img
                        className="uploadpic w-1/5 mb-[-75px] relative"
                        src="src/assets/uploadpic.png"
                      />
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        {...register("image")}
                        required
                      />
                    </div>

                    <textarea
                      rows="2"
                      placeholder="What's your product price in roman numerals?"
                      className="textareapop ml-[130px] mb-[10px] w-3/5 h-[70px] relative rounded"
                      onInput={handleTextareaInput}
                      {...register("price")}
                      required
                    ></textarea>

                    <textarea
                      rows="2"
                      placeholder="write your product's name"
                      className="textareapop3 w-full relative z-10 rounded"
                      {...register("name")}
                      required
                    ></textarea>
                    <textarea
                      rows="2"
                      placeholder="write your product's description"
                      className="textareapop2 w-full relative z-10 rounded"
                      {...register("description")}
                      required
                    ></textarea>
                    <button
                      type="submit"
                      className="relative ml-[350px] top-[10px] bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
                    >
                      Post
                    </button>
                  </form>
                </span>
              </Popup>
              <p className="popupp ml-[-90px] relative top-[-20px] font-serif text-lg font-extrabold border-4 border-pink-600 bg-[#cf2a8d75] p-1 inline">
                Sell Your Art
              </p>
            </>
          )}
          <div className="row flex flex-wrap justify-between w-full">
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
                  className="col-sm-6 col-lg-4 basis-[calc(33.333%-20px)] mb-5"
                >
                  <div className="box inline-block flex-col items-center p-4 mt-4 relative overflow-hidden w-[94%]">
                    <div className="img-box bg-gray-200 w-full h-[275px] flex justify-center items-center relative p-4 group">
                      <div className="absolute top-0 left-0 flex items-center">
                        <figure className="w-[50px] sm:w-[50px] rounded-full overflow-hidden mb-2 sm:mb-0 sm:mr-4">
                          <img
                            src={`http://localhost:8000${product.user_image}`}
                            alt="Profile"
                            className="rounded-full h-[50px] w-[50px]"
                          />
                        </figure>
                        <p className="text-xl font-bold mb-3">
                          {product.username}
                        </p>
                      </div>
                      <img
                        src={`http://localhost:8000${product.image}`}
                        alt={product.name}
                        className="h-[175px] max-w-full"
                      />
                      {Token && (
                        <button
                          className="add_cart_btn inline-block w-[175px] text-center h-[45px] leading-[45px] bg-gray-500 text-white absolute bottom-1/2 left-1/2 transform translate-x-[-50%] translate-y-[50%] transition-colors duration-300 opacity-0 z-10 group-hover:opacity-100 group-hover:bg-pink-500"
                          onClick={() => handleAddToCart(product)}
                        >
                          <span>Add To Cart</span>
                        </button>
                      )}
                    </div>

                    <div className="detail-box pt-4 flex-col w-full">
                      <h5 className="text-xl font-bold mb-3">{product.name}</h5>

                      <h5 className="text-l mb-3">{product.description}</h5>

                      <div className="product_info flex justify-between">
                        <h5 className="font-bold">
                          <span>$</span> {product.price}
                        </h5>
                        <div className="star_container text-[#f2b01e]">
                          <i className="fa fa-star" aria-hidden="true"></i>
                          <i className="fa fa-star" aria-hidden="true"></i>
                          <i className="fa fa-star" aria-hidden="true"></i>
                          <i className="fa fa-star" aria-hidden="true"></i>
                          <i className="fa fa-star" aria-hidden="true"></i>
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
                className="view_more-link inline-block py-2 px-12 bg-pink-500 text-white rounded border border-pink-600 transition-colors duration-300 hover:bg-transparent hover:text-pink-500"
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
