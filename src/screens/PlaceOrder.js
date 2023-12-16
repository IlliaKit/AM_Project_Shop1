import React from "react";
import { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";

import BurgerMenu from "../components/BurgerMenu";

const PlaceOrder = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };
  return (
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
  );
};

export default PlaceOrder;
