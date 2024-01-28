import React from "react";
import Navigation from "./src/components/Navigation";
import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";
import { PurchaseHistoryProvider } from "./src/context/PurchaseHistoryContext";
const App = () => {
  return (
    <CartProvider>
      <PurchaseHistoryProvider>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </PurchaseHistoryProvider>
    </CartProvider>
  );
};

export default App;
