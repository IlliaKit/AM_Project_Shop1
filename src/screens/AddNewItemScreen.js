import React, { useContext } from "react";
import { Alert, TouchableOpacity, View, Text, Image } from "react-native";
import BurgerMenu from "../components/BurgerMenu";
import { styles } from "../components/styles.js";
import { useState } from "react";

// Screen for adding a new product
const AddNewItemScreen = ({ navigation }) => {
  // Состояние для видимости бургер-меню
  const [isMenuVisible, setMenuVisible] = useState(false);

  // Function to toggle the visibility of the burger menu
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
      
      <Text>AddNewItemScreen</Text>
    </View>
  );
};

export default AddNewItemScreen;
