import React, { useContext, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { isLoading, login } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Name"
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
          onPress={() => {
            login(email, password);
          }}
        >
          <Text style={{ color: "white" }}> Continue</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text>Don't have an Account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>Create One</Text>
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
    height: "15%",
    backgroundColor: "#8181F7",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;
