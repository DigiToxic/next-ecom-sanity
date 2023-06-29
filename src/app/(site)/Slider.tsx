"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTimes } from "@fortawesome/free-solid-svg-icons";
import useCart from "./useCart";

interface MobileNavProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function MobileNav({ open, setOpen }: MobileNavProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  useEffect(() => {
    setShouldRender(true);
  }, []);

  return shouldRender ? (
    <div
      className={`fixed top-0 bottom-0 right-0 h-screen w-96 z-20 pr-1 bg-white border-4 rounded-tl-3xl rounded-bl-3xl  shadow-inner  border-[rgb(77,77,77)]  transform ${
        open ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out filter`}
    >
      <button
        className="absolute top-5 right-8 text-3xl text-black z-20"
        onClick={() => setOpen(false)}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>

      <div
        className="cart-items-container overflow-y-auto pb-0 custom-scrollbar"
        style={{ maxHeight: "calc(100% - 90px)" }}
      >
        <div className="absolute bottom-0 border-t-2 border-black pt-[29.5px] pb-5 px-[130.5px] bg-[rgba(77,77,77,0.19)]">
          <button className="bg-[#0453FF] px-10 py-1 rounded-2xl text-white hover:bg-[#0454ffb7] active:bg-[#2457c4] z-10">
            Checkout
          </button>
        </div>
        {cartItems.length === 0 ? (
          <div className="text-center mt-80 text-2xl font-semibold">
            Your cart is empty!
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="cart-item relative mb-4">
              <button
                className="absolute top-[75px] right-[90px] text-2xl text-black p-2"
                onClick={() => removeFromCart(item._id)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <img
                className="product-img-cart"
                src={item.images && item.images[0] ? item.images[0].url : ""}
                alt={item.name}
              />
              <div className="flex justify-evenly w-5/6 mt-2">
                <div className="w-[60%]">
                <p>{item.name}</p>
                </div>
                <p>{item.price}</p>
              </div>
              <div className="flex justify-around items-center w-1/2">
                <button
                  className="mt-2 border-2 rounded-full bg-[rgb(0,97,248)] px-3 pb-1 text-white text-xl cursor-pointer"
                  onClick={() => decreaseQuantity(item._id)}
                >
                  -
                </button>
                <p className="mt-2">Quantity: {item.quantity}</p>
                <button
                  className="mt-2 border-2 rounded-full bg-[rgb(0,97,248)] px-2 pb-1 text-white text-xl cursor-pointer"
                  onClick={() => increaseQuantity(item._id)}
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  ) : null;
}

function Navbar() {
  const [open, setOpen] = useState(false);

  const handleCartButtonClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <MobileNav open={open} setOpen={setOpen} />
      <div>
        <button
          className="z-10 relative h-9  -ml-2 cursor-pointer underline"
          onClick={() => {
            handleCartButtonClick();
          }}
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
