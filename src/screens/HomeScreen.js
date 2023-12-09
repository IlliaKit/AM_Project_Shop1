import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const { isLoading, logout } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);

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
        <Text>{item.price}</Text>
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
          <Button
            title="HOME"
            color="red"
            onPress={() => {
              navigation.navigate("Login");
            }}
          />
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
