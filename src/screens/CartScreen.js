import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import BurgerMenu from "../components/BurgerMenu";
import { useState } from "react";
import { useCart } from "../context/CartContext.js";

const CartScreen = ({ navigation }) => {
  // Get functions for working with the cart from the context
  const { cartItems, removeFromCart, addToCart } = useCart();

  // State for burger menu visibility
  const [isMenuVisible, setMenuVisible] = useState(false);

  // Function to toggle the visibility of the burger menu
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  // Function to go to the checkout screen
  const navigateToComponentPlaceOrder = () => {
    navigation.navigate("PlaceOrder", { data: getTotalPrice() });
  };

  // Function to get the total cost of items in the cart
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <>
      <View
        style={{
          paddingTop: 30,
        }}
      >
        
        <TouchableOpacity onPress={toggleMenu}>
          <Image source={require("../img/Burger.jpg")} />
        </TouchableOpacity>
        
        <BurgerMenu isVisible={isMenuVisible} toggleMenu={toggleMenu} />
      </View>
      
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View>
          
          {cartItems == "" ? (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                style={{ width: 100, height: 100 }}
                source={require("../img/Empty.png")}
              />
              <Text style={{ padding: 20, fontSize: 20, fontWeight: "bold" }}>
                Your Cart is Empty
              </Text>
              
              <TouchableOpacity
                style={{
                  height: 40,
                  width: "100%",
                  backgroundColor: "#8181F7",
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={{ color: "white" }}>Explore Home</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // If the cart is not empty, display the contents
            <ScrollView>
              {/* Display each item in the cart */}
              {cartItems.map((item) => (
                <View key={item.id} style={styles.container}>
                  <Image
                    source={{ uri: item?.image }}
                    style={{ width: 50, height: 50, borderRadius: 10 }}
                  />
                  <View style={{ flexDirection: "column", width: 200 }}>
                    <Text style={{ paddingLeft: 10, paddingRight: 10 }}>
                      {item.title}
                    </Text>
                    <Text style={styles.cartItemSize}>Size- {item.size}</Text>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontWeight: "bold" }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                    {/* Buttons for managing the quantity of goods */}
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() => removeFromCart(item, item.size)}
                      >
                        <Text style={styles.quantity}>-</Text>
                      </TouchableOpacity>
                      <Text style={{ paddingLeft: 5, paddingRight: 5 }}>
                        {item.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() => addToCart(item, item.size)}
                      >
                        <Text style={styles.quantity}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
              {/* The total cost */}
              <Text style={styles.total}>
                Subtotal: ${getTotalPrice().toFixed(2)}
              </Text>
              <Text style={styles.total}>Shoping Cost: $8</Text>
              <Text style={styles.total}>Tax: $0</Text>
              <Text style={styles.total}>
                Total: {(getTotalPrice() + 8).toFixed(2)}
              </Text>
              
              <TouchableOpacity
                style={{
                  height: 40,
                  width: "100%",
                  backgroundColor: "#8181F7",
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
                onPress={navigateToComponentPlaceOrder}
              >
                <Text style={{ color: "white" }}>Checkout</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </View>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 30,
    backgroundColor: "#E6E6E6",
    borderRadius: 30,
    padding: 10,
  },

  quantity: {
    backgroundColor: "#8181F7",
    borderRadius: 50,
    height: 25,
    width: 25,
    paddingLeft: 8,
  },
  total: {
    fontSize: 18,
    color: "gray",
    fontWeight: "normal",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
