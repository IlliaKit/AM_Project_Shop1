import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
const BurgerMenu = ({ isVisible, toggleMenu }) => {
  const navigation = useNavigation();
  const { userInfo, logout, isLoading } = useContext(AuthContext);
  const navigateToScreen = (screenName) => {
    toggleMenu();
    navigation.navigate(screenName);
  };

  const alertLogin = () =>
    Alert.alert("", "Already registered, would you like to log out?", [
      { text: "Yeas", onPress: () => logout() },
      { text: "No", onPress: () => navigateToScreen("Home") },
    ]);

  return (
    <Modal isVisible={isVisible} onBackdropPress={toggleMenu}>
      <Spinner visible={isLoading} />
      <View style={styles.modalContent}>
        <Text style={styles.title}>Shop by Categories</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => navigateToScreen("Home")}
        >
          <Image source={require("../img/Home.png")} />
          <Text> Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.input}
          onPress={() => navigateToScreen("")}
        >
          <Image source={require("../img/Sales.png")} />
          <Text> Sales</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.input}
          onPress={() => navigateToScreen("")}
        >
          <Image source={require("../img/Cart.png")} />
          <Text> Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            userInfo.token ? alertLogin() : navigateToScreen("Login");
          }}
        >
          <Image source={require("../img/Login.png")} />
          <Text> Login</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "400",
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#E6E6E6",
    borderRadius: 5,
    width: "90%",
    height: 60,
    paddingHorizontal: 14,
    flexDirection: "row",

    alignItems: "center",
  },
});

export default BurgerMenu;