import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";

import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import BurgerMenu from "../components/BurgerMenu";
import { styles } from "../components/styles.js"; // Импорт стилей из отдельного файла

const SalesScreen = () => {
  const { isLoading } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);

  const [isMenuVisible, setMenuVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalVisible, setProductModalVisible] = useState(false);

  const [selectedSize, setSelectedSize] = useState("S");

  const handleSizePress = (size) => {
    setSelectedSize(size);
  };

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const toggleProductModal = () => {
    setProductModalVisible(!isProductModalVisible);
  };

  useEffect(() => {
    setProductLoading(true);

    axios
      .get("https://fakestoreapi.com/products/category/men's clothing")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((e) => {
        console.log(`register error ${e}`);
      })
      .finally(() => {
        setProductLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductPress(item)}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <Text style={styles.itemTitle} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text ellipsizeMode="tail">
          <Text
            style={{
              textDecorationLine: "line-through",
              textDecorationColor: "red",
            }}
          >
            ${item.price}
          </Text>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            {" "}
            ${item.price - 10}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    toggleProductModal();
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      {productLoading ? (
        <ActivityIndicator size={"large"} color={"#000000"} />
      ) : (
        <>
          <View style={styles.burger}>
            <TouchableOpacity onPress={toggleMenu}>
              <Image source={require("../img/Burger.jpg")} />
            </TouchableOpacity>
            <BurgerMenu isVisible={isMenuVisible} toggleMenu={toggleMenu} />
          </View>
          <Text
            style={{
              paddingLeft: "15%",
              marginBottom: 20,
              fontWeight: "bold",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            Only office supplies in the shop
          </Text>
          <FlatList
            data={products}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={(element) => element.id.toString()}
          />

          {/* -----------SELECT SWITCH PRODUCT---------------- */}
          <Modal visible={isProductModalVisible} animationType="slide">
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={toggleProductModal}
            >
              <Image source={require("../img/Burger.jpg")} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{ left: "90%", top: -40 }}
                source={require("../img/like.png")}
              />
            </TouchableOpacity>
            <ScrollView>
              <View style={styles.productModalContainer}>
                <View style={styles.wrapper}>
                  <Image
                    source={{ uri: selectedProduct?.image }}
                    style={styles.selectItemImg}
                  />

                  <Text style={{ marginBottom: 20, marginTop: 20 }}>
                    {selectedProduct?.title}
                  </Text>
                  <Text style={styles.selectPrice}>
                    ${selectedProduct?.price - 10}
                  </Text>
                  <View style={styles.size_color}>
                    <Text>Size</Text>
                    <TouchableOpacity
                      style={[
                        styles.input_second,
                        selectedSize === "S" && styles.selectedSize,
                      ]}
                      onPress={() => handleSizePress("S")}
                    >
                      <Text>S</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.input_second,
                        selectedSize === "M" && styles.selectedSize,
                      ]}
                      onPress={() => handleSizePress("M")}
                    >
                      <Text>M</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.input_second,
                        selectedSize === "L" && styles.selectedSize,
                      ]}
                      onPress={() => handleSizePress("L")}
                    >
                      <Text>L</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.input_second,
                        selectedSize === "XL" && styles.selectedSize,
                      ]}
                      onPress={() => handleSizePress("XL")}
                    >
                      <Text>XL</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.input}>Color</Text>
                  <Text style={{ marginBottom: 20 }}>
                    {selectedProduct?.description}
                  </Text>
                  <TouchableOpacity style={styles.ButAddToBag}>
                    <Text style={{ color: "white" }}>Add to Bag</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </Modal>
        </>
      )}
    </View>
  );
};

export default SalesScreen;
