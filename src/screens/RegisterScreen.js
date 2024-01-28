import React, { useContext, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";
import BurgerMenu from "../components/BurgerMenu";

const RegisterScreen = ({ navigation }) => {
  // Function to display a warning if the password is incorrect
  const alertPassword = () =>
    Alert.alert(
      "Ups..",
      "Incorrect password. It must have a minimum length of 8"
    );

  // Function to display a warning if the name is incorrect
  const alertName = () =>
    Alert.alert("Ups..", "Incorrect name. It must have a minimum length of 3");

  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, register, userInfo } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* Show the menu only if the user is logged in */}
      {userInfo.token ? (
        <>
          <View style={styles.burger}>
            <TouchableOpacity onPress={toggleMenu}>
              <Image source={require("../img/Burger.jpg")} />
            </TouchableOpacity>
            <BurgerMenu isVisible={isMenuVisible} toggleMenu={toggleMenu} />
          </View>
        </>
      ) : null}

      <Text style={styles.title}>Sign in</Text>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={username}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        {/* Check conditions before calling registration function */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (password.length < 8) {
              alertPassword();
            } else if (username.length < 3) {
              alertName();
            } else {
              register(username, email, password);
            }
          }}
        >
          <Text style={{ color: "white" }}> Continue</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text>Already created an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "30%",
    justifyContent: "flex-start",
    marginLeft: "10%",
  },
  wrapper: {
    width: "90%",
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "400",
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#E6E6E6",
    borderRadius: 5,
    height: "12%",
    paddingHorizontal: 14,
  },
  link: {
    color: "black",
    fontWeight: "bold",
  },
  button: {
    height: "12%",
    backgroundColor: "#8181F7",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegisterScreen;
