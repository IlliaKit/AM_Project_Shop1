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

// Side menu component
const BurgerMenu = ({ isVisible, toggleMenu }) => {
  const navigation = useNavigation();
  const { userInfo, logout, isLoading } = useContext(AuthContext);

  // Function to navigate to the specified screen
  const navigateToScreen = (screenName) => {
    toggleMenu();
    navigation.navigate(screenName);
  };

  // Warning when trying to log in if the user is already registered
  const alertLogin = () =>
    Alert.alert("", "Already registered, would you like to log out?", [
      { text: "Yes", onPress: () => logout() },
      { text: "No", onPress: () => navigateToScreen("Home") },
    ]);

  return (
    <Modal isVisible={isVisible} onBackdropPress={toggleMenu}>
      <Spinner visible={isLoading} />
      <View style={styles.modalContent}>
        <Text style={styles.title}>Shop by Categories</Text>

        {/* Buttons for different screens */}
        <TouchableOpacity
          style={styles.input}
          onPress={() => navigateToScreen("Home")}
        >
          <Image source={require("../img/Home.png")} />
          <Text> Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.input}
          onPress={() => navigateToScreen("Sales")}
        >
          <Image source={require("../img/Sales.png")} />
          <Text> Sales</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.input}
          onPress={() => navigateToScreen("Cart")}
        >
          <Image source={require("../img/Cart.png")} />
          <Text> Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.input}
          onPress={() => navigateToScreen("MyAccount")}
        >
          <Image source={require("../img/Login.png")} />
          <Text>My account</Text>
        </TouchableOpacity>

        {/* Login/logout depending on user state */}
        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            userInfo.token ? alertLogin() : navigateToScreen("Login");
          }}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../img/logout.png")}
          />
          <Text> Logout</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    height: "110%",
    width: "120%",
    left: "-10%",
    padding: 30,
    justifyContent: "flex-start",
    alignItems: "center",
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
    width: "100%",
    height: 60,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default BurgerMenu;
