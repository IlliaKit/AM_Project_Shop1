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
  ScrollView,
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
            renderItem={renderItem}
            keyExtractor={(element) => element.id}
          />

          <Modal visible={isProductModalVisible} animationType="slide">
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={toggleProductModal}
            >
              <Image source={require("../img/Burger.jpg")} />
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
                    ${selectedProduct?.price}
                  </Text>
                  <Text style={styles.input}>Size</Text>
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

const styles = StyleSheet.create({
  container: {
    marginTop: "12%",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  wrapper: {
    width: "90%",
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
    marginTop: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  selectItemImg: {
    height: 300,
    width: 300,
  },
  selectPrice: {
    color: "#8181F7",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    height: 50,
    width: "90%",
    paddingLeft: 10,
    paddingTop: 10,
  },
  ButAddToBag: {
    height: 40,
    paddingEnd: 10,
    backgroundColor: "#8181F7",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
