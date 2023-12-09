import React, { useContext, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";

const RegisterScreen = ({ navigation }) => {
  const alertPassword = () =>
    Alert.alert("Ups..", "Incorrect password must have a minimum length of 8");
  const alertName = () =>
    Alert.alert("Ups..", "Incorrect password must have a minimum length of 3");

  const [username, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { isLoading, register } = useContext(AuthContext);

  return (
    <View style={styles.container}>
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
        <TouchableOpacity
          style={styles.button}
          onPress={
            password.length < 8
              ? alertPassword
              : username.length < 3
              ? alertName
              : () => {
                  register(username, email, password);
                }
          }
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
