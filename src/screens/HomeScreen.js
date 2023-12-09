import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import BurgerMenu from "../components/BurgerMenu";
const HomeScreen = ({ navigation }) => {
  const { isLoading, logout } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);

  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const cat = "jewelery";
  useEffect(() => {
    setProductLoading(true);

    axios
      .get("https://fakestoreapi.com/products")
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
    <View>
      <View>
        <Image
          source={{ uri: item.image }}
          style={{ width: 100, height: 100 }}
        ></Image>
      </View>
      <View>
        <Text>{item.title}</Text>
        <Text style={{ fontWeight: 300 }}>{item.category}</Text>
        <Text>{item.price}$</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      {productLoading ? (
        <View>
          <ActivityIndicator size={"large"} color={"#000000"} />
        </View>
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
            keyExtractor={(element) => element.id}
            renderItem={renderItem}
          />
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
});

export default HomeScreen;
