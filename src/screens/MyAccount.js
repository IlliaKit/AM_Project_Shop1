import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BurgerMenu from "../components/BurgerMenu";

import { usePurchaseHistory } from "../context/PurchaseHistoryContext";

const STORAGE_KEY = "avatar";

const BackgroundPicker = () => {
  const { purchaseHistory } = usePurchaseHistory();
  const [avatar, setAvatar] = useState(null);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  useEffect(() => {
    // Load avatar from AsyncStorage when the component mounts
    const loadAvatar = async () => {
      try {
        const storedAvatar = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedAvatar) {
          setAvatar(storedAvatar);
        }
      } catch (error) {
        console.error("Error loading avatar from AsyncStorage:", error);
      }
    };

    loadAvatar();
  }, []);

  const saveAvatarToStorage = async (uri) => {
    // Save avatar URI to AsyncStorage
    try {
      await AsyncStorage.setItem(STORAGE_KEY, uri);
    } catch (error) {
      console.error("Error saving avatar to AsyncStorage:", error);
    }
  };

  const pickImage = async () => {
    // Pick an image from the device's gallery
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      // Set the selected image URI and save it to AsyncStorage
      setAvatar(result.uri);
      saveAvatarToStorage(result.uri);
    }
  };

  return (
    <>
      {/* Header section */}
      <View style={{ paddingTop: 30 }}>
        <TouchableOpacity onPress={toggleMenu}>
          <Image source={require("../img/Burger.jpg")} />
        </TouchableOpacity>
        <BurgerMenu isVisible={isMenuVisible} toggleMenu={toggleMenu} />
      </View>

      {/* Avatar selection section */}
      <View style={{ paddingLeft: 20 }}>
        <TouchableOpacity onPress={pickImage}>
          {/* Display selected avatar or a placeholder */}
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholder} />
          )}
        </TouchableOpacity>

        {/* Button to change avatar */}
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
          onPress={pickImage}
        >
          <Text style={{ color: "white" }}>Change Avatar</Text>
        </TouchableOpacity>
      </View>

      {/* Purchase history section */}
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 15 }}>
          Your History
        </Text>

        <ScrollView>
          {/* Display each item in the purchase history */}
          {purchaseHistory.map((item) => (
            <View key={item.id} style={styles.info}>
              {/* Display product image */}
              <Image
                source={{ uri: item?.image }}
                style={{ width: 50, height: 50, borderRadius: 10 }}
              />

              {/* Display product details */}
              <View style={{ flexDirection: "column", width: 200 }}>
                <Text style={{ paddingLeft: 10, paddingRight: 10 }}>
                  {item.title}
                </Text>
                <Text>Size: {item.size}</Text>
                <Text>Quantity: {item.quantity}</Text>
              </View>

              {/* Display product price and quantity */}
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontWeight: "bold" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
                {/* Buttons for managing the quantity of goods */}
                <View style={{ flexDirection: "row" }}></View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  placeholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "lightgray",
    marginBottom: 10,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  info: {
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
});

export default BackgroundPicker;
