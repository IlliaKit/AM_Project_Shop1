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

import BurgerMenu from "../components/BurgerMenu";

const PlaceOrder = ({ route, navigation }) => {
  const price = route.params?.data || 0;
  const [isMenuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const [address, setAddress] = useState(null);
  const [paymentDataMonth, setPaymentDataMonth] = useState(null);
  const [paymentDataYear, setPaymentDataYear] = useState(null);
  const [paymentCard, setPaymentCard] = useState(null);
  const [CVC, setCVC] = useState(null);
  return (
    <>
      <View
        style={{
          paddingTop: 30,
        }}
      >
        <TouchableOpacity onPress={toggleMenu}>
          <Image source={require("../img/Burger.jpg")} />
        </TouchableOpacity>
        <BurgerMenu isVisible={isMenuVisible} toggleMenu={toggleMenu} />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View style={styles.container}>
          <Text>Shipping Address</Text>
          <TextInput
            value={address}
            placeholder="Street, House number, Index, City"
            onChangeText={(text) => setAddress(text)}
          />
        </View>
        <View style={styles.container}>
          <Text>Payment Method</Text>
          <Image
            style={{
              width: 20,
              height: 20,
              position: "absolute",
              left: 150,
              bottom: 65,
            }}
            source={require("../img/masterCard.png")}
          />
          <TextInput
            value={paymentCard}
            placeholder="Card"
            onChangeText={(text) => setPaymentCard(text)}
          ></TextInput>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              value={paymentDataMonth}
              placeholder="Month"
              onChangeText={(text) => setPaymentDataMonth(text)}
            ></TextInput>
            <Text>/</Text>
            <TextInput
              value={paymentDataYear}
              placeholder="Year"
              onChangeText={(text) => setPaymentDataYear(text)}
            ></TextInput>
            <TextInput
              style={{ paddingLeft: 50 }}
              value={CVC}
              placeholder="CVV/CVC"
              onChangeText={(text) => setCVC(text)}
            ></TextInput>
          </View>
        </View>

        <View>
          <Text style={styles.total}>Subtotal: ${price}</Text>
          <Text style={styles.total}>Shoping Cost: $8</Text>
          <Text style={styles.total}>Tax: $0</Text>
          <Text style={styles.total}>Total:{(price + 8).toFixed(2)} </Text>
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
          onPress={() => navigation.navigate("PlaceOrderSuc")}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              ${(price + 8).toFixed(2)}
            </Text>
            <Text style={{ color: "white" }}> Place Order</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    width: "90%",
    padding: 10,
    marginBottom: 20,
  },
  total: {
    fontSize: 18,
    color: "gray",
    fontWeight: "normal",
    marginVertical: 10,
  },
});
