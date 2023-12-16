import React from "react";
import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  StyleSheet,
} from "react-native";

const PlaceOrderSuc = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={{ height: 500, justifyContent: "center", alignItems: "center" }}
      >
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../img/PlaceOrder.png")}
        />
      </View>

      <View style={styles.containerBot}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.title}>Order Placed</Text>
          <Text style={styles.title}>Successfully</Text>
          <Text style={styles.text}>You will recieve an email information</Text>
        </View>

        <TouchableOpacity
          style={{
            height: 40,
            width: "90%",
            backgroundColor: "#8181F7",
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
          onPress={() => navigation.navigate("PlaceOrder")}
        >
          <Text style={{ color: "white" }}> Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlaceOrderSuc;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#8181F7",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  containerBot: {
    flex: 1,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
  },
  title: {
    paddingTop: 15,
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    paddingTop: 30,
    paddingBottom: 50,
    color: "gray",
  },
});
