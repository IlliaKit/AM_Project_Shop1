import React, { useContext } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = ({ navigation }) => {
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  console.log(userInfo);
  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Text>Welcome {userInfo.name}</Text>
      <Button title="Logout" color="red" onPress={logout} />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
