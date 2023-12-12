import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import BurgerMenu from "../components/BurgerMenu";
import { useState } from "react";
import { styles } from "../components/styles.js";
import { useCart } from "../components/CartContext.js";

const CartScreen = () => {
  const { cartItems, removeFromCart } = useCart();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };
  return (
    <View style={styles.container}>
      <View style={styles.burger}>
        <TouchableOpacity onPress={toggleMenu}>
          <Image source={require("../img/Burger.jpg")} />
        </TouchableOpacity>
        <BurgerMenu isVisible={isMenuVisible} toggleMenu={toggleMenu} />
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
      </View>
    </View>
  );
};

export default CartScreen;
