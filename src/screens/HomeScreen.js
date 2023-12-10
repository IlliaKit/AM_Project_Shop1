import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import BurgerMenu from "../components/BurgerMenu";

const HomeScreen = () => {
  const { isLoading } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);

  const [isMenuVisible, setMenuVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalVisible, setProductModalVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const toggleProductModal = () => {
    setProductModalVisible(!isProductModalVisible);
  };

  useEffect(() => {
    setProductLoading(true);

    axios
      .get("https://fakestoreapi.com/products/")
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
      <View>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text>{item.title}</Text>
          <Text style={{ fontWeight: "300" }}>{item.category}</Text>
          <Text>{item.price}$</Text>
        </View>
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

          <FlatList
            data={products}
            keyExtractor={(element) => element.id.toString()}
            renderItem={renderItem}
          />

          <Modal visible={isProductModalVisible} animationType="slide">
            <View style={styles.productModalContainer}>
              <Text>{selectedProduct?.title}</Text>
              <Text>{selectedProduct?.category}</Text>
              <Text>{selectedProduct?.price}$</Text>

              <Button title="Close" onPress={toggleProductModal} />
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "12%",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  burger: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 20,
    color: "black",
  },
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  productModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
