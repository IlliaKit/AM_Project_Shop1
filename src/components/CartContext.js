import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

// CartContext.js
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item, size) => {
    const existingItem = cartItems.find(
      (i) => i.id === item.id && i.size === size
    );

    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((i) =>
          i.id === item.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        { ...item, quantity: 1, size },
      ]);
    }
  };

  const removeFromCart = (item) => {
    setCartItems((prevItems) =>
      prevItems.reduce((acc, i) => {
        if (i.id === item.id && i.quantity > 1) {
          acc.push({ ...i, quantity: i.quantity - 1 });
        } else if (i.id !== item.id) {
          acc.push(i);
        }
        return acc;
      }, [])
    );
  };

  const increaseQuantity = (item) => {
    setCartItems((prevItems) =>
      prevItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const decreaseQuantity = (item) => {
    setCartItems((prevItems) =>
      prevItems.map((i) =>
        i.id === item.id && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
