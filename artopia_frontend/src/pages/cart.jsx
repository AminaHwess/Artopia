import React from "react";
import { useCart } from "react-use-cart";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer.jsx";

const Cart = () => {
  const { isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem } =
    useCart();

  if (isEmpty)
    return (
      <>
        <Navbar />
        <p className="text-[#d5168c] text-[170px] font-normal font-[freight-big-pro] tracking-[-6.5px] text-center overflow-break-word">
          Your cart is empty ☹️
        </p>
        <Footer />
      </>
    );

  return (
    <div>
      <Navbar />
      <h1 className="text-center inline-block py-1 px-2 bg-[#db9ad094] rounded-md font-serif text-lg mt-0 ml-[670px]">
        Cart ({totalUniqueItems})
      </h1>

      <ul>
        {items.map((item) => (
          <li key={item.id} className="inline-block relative ml-[120px]">
            <div className="cart-item">
              <div className="cart-item-details">
                <div className="cart-item-buttons flex items-center gap-4">
                  <span className="font-[Arial, Helvetica, sans-serif] text-lg font-bold">
                    1 x {item.name}
                  </span>
                  <button
                    onClick={() =>
                      updateItemQuantity(item.id, 0)
                    }
                    className="text-blueviolet text-[20px] font-extrabold text-shadow-md"
                  >
                    -
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-blueviolet text-[20px] font-extrabold text-shadow-md"
                  >
                    &times;
                  </button>
                </div>

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[200px] rounded-[15px] shadow-md shadow-[#e98acc]"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default Cart;
