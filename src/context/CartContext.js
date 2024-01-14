import React, { createContext, useState, useContext } from "react";

// Create a context for the cart
const CartContext = createContext();

// CartProvider component to manage cart state and functions
export const CartProvider = ({ children }) => {
  // State to store the items in the cart
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addToCart = (item, size) => {
    // Find the index of an existing product in the cart
    const existingItemIndex = cartItems.findIndex(
      (i) => i.id === item.id && i.size === size
    );

    if (existingItemIndex !== -1) {
      // If the item is already in the cart, increase its quantity
      setCartItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      });
    } else {
      // If the item is not in the cart, add a new item
      setCartItems((prevItems) => [
        ...prevItems,
        { ...item, quantity: 1, size: size },
      ]);
    }
  };

  // Function to remove all products from the cart
  const removeFromCartAll = () => {
    setCartItems([]);
  };

  // Function to reduce the quantity of items in the cart
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
    // Provide context values to child components
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, removeFromCartAll }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};
