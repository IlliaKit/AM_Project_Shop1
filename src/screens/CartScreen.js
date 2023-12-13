import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import BurgerMenu from "../components/BurgerMenu";
import { useState } from "react";
import { styles } from "../components/styles.js";
import { useCart } from "../components/CartContext.js";

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart } = useCart();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
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
              <Text style={{ padding: 20, fontSize: 20 }}>
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
            <>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <Image
                    source={{ uri: item?.image }}
                    style={{ width: 30, height: 30 }}
                  />
                  <Text style={styles.cartItemTitle}>{item.title}</Text>
                  <Text style={styles.cartItemTitle}>{item.price}</Text>
                  <TouchableOpacity onPress={() => removeFromCart(item)}>
                    <Text style={{ color: "red" }}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default CartScreen;
