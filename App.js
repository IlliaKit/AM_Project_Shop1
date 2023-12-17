import React from "react";
import Navigation from "./src/components/Navigation";
import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from "./src/components/CartContext";

const App = () => {
  return (
    <CartProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </CartProvider>
  );
};

export default App;
