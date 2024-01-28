import React, { createContext, useContext, useState } from "react";

// Create a context for the purchase history
const PurchaseHistoryContext = createContext();

// PurchaseHistoryProvider component to manage purchase history state and functions
export const PurchaseHistoryProvider = ({ children }) => {
  // State to store the purchase history
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  // Function to add items to the purchase history
  const addToPurchaseHistory = (items) => {
    setPurchaseHistory((prevHistory) => [...prevHistory, ...items]);
  };

  return (
    // Provide context values to child components
    <PurchaseHistoryContext.Provider
      value={{ purchaseHistory, addToPurchaseHistory }}
    >
      {children}
    </PurchaseHistoryContext.Provider>
  );
};

// Custom hook to use the purchase history context
export const usePurchaseHistory = () => {
  return useContext(PurchaseHistoryContext);
};
