import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { useCart } from "../context/CartContext.js";
import { usePurchaseHistory } from "../context/PurchaseHistoryContext.js";
// Confirmation screen for successful ordering
const PlaceOrderSuc = ({ navigation }) => {
  const { removeFromCartAll, cartItems } = useCart();
  const { addToPurchaseHistory } = usePurchaseHistory();

  return (
    <View style={styles.container}>
      {/* Top of the screen with an image */}
      <View
        style={{ height: 500, justifyContent: "center", alignItems: "center" }}
      >
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../img/PlaceOrder.png")}
        />
      </View>

      {/* Bottom of screen with text and button */}
      <View style={styles.containerBot}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.title}>Order Placed</Text>
          <Text style={styles.title}>Successfully</Text>
          <Text style={styles.text}>
            You will receive an email with order information
          </Text>
        </View>

        {/* Button to go to the main screen */}
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
          onPress={() => {
            navigation.navigate("Home");
            removeFromCartAll();
            addToPurchaseHistory(cartItems, { date: new Date() });
          }}
        >
          <Text style={{ color: "white" }}> Go to Home Screen</Text>
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
