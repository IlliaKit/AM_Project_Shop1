import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import { TextInputMask } from "react-native-masked-text";
import BurgerMenu from "../components/BurgerMenu";

import * as Location from "expo-location";
const PlaceOrder = ({ route, navigation }) => {
  const price = route.params?.data || 0;
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentDataMonth, setPaymentDataMonth] = useState("");
  const [paymentDataYear, setPaymentDataYear] = useState("");
  const [paymentCard, setPaymentCard] = useState("");
  const [CVC, setCVC] = useState("");
  const [location, setLocation] = useState(null);

  // Popup error messages
  const alertAddress = () => Alert.alert("Ups..", "Incorrect Address");
  const alertCard = () => Alert.alert("Ups..", "Incorrect Payment Method");

  const checkingInputValues = () => {
    const isAddressValid = address.length > 10;
    const isPaymentCardValid =
      paymentCard.length === 20 &&
      paymentDataYear.length === 2 &&
      CVC.length === 3 &&
      paymentDataMonth < 13;

    if (isAddressValid && isPaymentCardValid) {
      navigation.navigate("PlaceOrderSuc");
    } else {
      if (!isAddressValid) {
        alertAddress();
      } else {
        alertCard();
      }
    }
  };

  const formatCreditCardNumber = (input) => {
    // Remove all non-numeric characters from input
    const cleanedInput = input.replace(/\D/g, "");

    // Add a space after every 4 digits
    const formattedInput = cleanedInput.replace(/(\d{4})/g, "$1 ");

    // State update
    setPaymentCard(formattedInput);
  };

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  useEffect(() => {
    const getLocationPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission denied",
            "You need to grant location permission to use this feature."
          );
        }
      } catch (error) {
        console.error("Error getting location permission:", error);
      }
    };

    getLocationPermission();
  }, []);

  const getCurrentLocation = async () => {
    try {
      // Попытка получить последние известные координаты
      const lastKnownLocation = await Location.getLastKnownPositionAsync({});

      if (lastKnownLocation) {
        const { coords } = lastKnownLocation;
        setLocation(coords);
        setAddress(`Lat: ${coords.latitude}, Long: ${coords.longitude}`);
      }

      // Запрос на получение текущего местоположения
      const { coords: currentCoords } = await Location.getCurrentPositionAsync(
        {}
      );
      setLocation(currentCoords);
      setAddress(
        `Lat: ${currentCoords.latitude}, Long: ${currentCoords.longitude}`
      );
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  return (
    <>
      <View style={{ paddingTop: 30 }}>
        <TouchableOpacity onPress={toggleMenu}>
          <Image source={require("../img/Burger.jpg")} />
        </TouchableOpacity>
        <BurgerMenu isVisible={isMenuVisible} toggleMenu={toggleMenu} />
      </View>
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}
      >
        <View style={styles.container}>
          <Text>Shipping Address</Text>
          <TextInput
            value={address}
            placeholder="Street, House number, Index, City"
            onChangeText={(text) => setAddress(text)}
          />
          <TouchableOpacity onPress={getCurrentLocation}>
            <Text style={{ fontWeight: "bold" }}>Use Current Location</Text>
          </TouchableOpacity>
        </View>

        {/* Enter payment card details */}
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
          <TextInputMask
            type={"credit-card"}
            options={{
              obfuscated: false,
              issuer: "visa-or-mastercard",
            }}
            placeholder="Card"
            maxLength={23}
            keyboardType="numeric"
            value={paymentCard}
            onChangeText={(text) => {
              formatCreditCardNumber(text);
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <TextInput
              value={paymentDataMonth}
              placeholder="Month"
              maxLength={2}
              keyboardType="numeric"
              onChangeText={(text) => setPaymentDataMonth(text)}
            ></TextInput>
            <Text>/</Text>
            <TextInput
              value={paymentDataYear}
              placeholder="Year"
              maxLength={2}
              keyboardType="numeric"
              onChangeText={(text) => setPaymentDataYear(text)}
            ></TextInput>
            <TextInput
              style={{ paddingLeft: 50 }}
              value={CVC}
              maxLength={3}
              keyboardType="numeric"
              placeholder="CVV/CVC"
              onChangeText={(text) => setCVC(text)}
            ></TextInput>
          </View>
        </View>

        {/* Display order cost */}
        <View>
          <Text style={styles.total}>Subtotal: ${price}</Text>
          <Text style={styles.total}>Shopping Cost: $8</Text>
          <Text style={styles.total}>Tax: $0</Text>
          <Text style={styles.total}>Total: ${(price + 8).toFixed(2)} </Text>
        </View>

        {/* Button to place an order */}
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
          onPress={checkingInputValues}
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
