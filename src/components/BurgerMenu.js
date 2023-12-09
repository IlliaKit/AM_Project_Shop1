import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

const BurgerMenu = ({ isVisible, toggleMenu }) => {
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const navigateToScreen = (screenName) => {
    toggleMenu();
    navigation.navigate(screenName);
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={toggleMenu}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Shop by Categories</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => navigateToScreen("Home")}
        >
          <Text>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToScreen("#")}>
          <Text>Sales</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToScreen("#")}>
          <Text>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            userInfo.token ? alert("Is login") : alert("Isn`t login");
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        {/* Добавьте дополнительные пункты меню по необходимости */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "white",
  },
});

export default BurgerMenu;
