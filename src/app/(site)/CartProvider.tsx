"use client"

import React, { useState, useEffect } from "react";
import CartContext, { ProjectWithQuantity } from "./CartContext";

interface CartProviderProps {
  children: React.ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ProjectWithQuantity[]>(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: ProjectWithQuantity) => {

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i._id === item._id);

      if (existingItem) {
        return prevItems.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, item];
      }
    });
  };

  const increaseQuantity = (itemId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
