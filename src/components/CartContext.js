import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

// CartContext.js
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item, size) => {
    const existingItemIndex = cartItems.findIndex(
      (i) => i.id === item.id && i.size === size
    );

    if (existingItemIndex !== -1) {
      // Если товар уже в корзине, увеличиваем его количество
      setCartItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      });
    } else {
      // Если товара нет в корзине, добавляем новый элемент
      setCartItems((prevItems) => [
        ...prevItems,
        { ...item, quantity: 1, size: size },
      ]);
    }
  };

  const removeFromCartAll = () => {
    setCartItems([]);
    console.log("Remove All");
  };

  const removeFromCart = (item, size) => {
    setCartItems((prevItems) =>
      prevItems.reduce((acc, i) => {
        if (i.id === item.id && i.size === size && i.quantity > 1) {
          acc.push({ ...i, quantity: i.quantity - 1 });
        } else if (i.id !== item.id || i.size !== item.size) {
          acc.push(i);
        }
        return acc;
      }, [])
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, removeFromCartAll }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
