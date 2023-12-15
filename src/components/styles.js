import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
export const styles = StyleSheet.create({
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

  productModalContainer: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  selectItemImg: {
    height: 400,
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
    width: "100%",
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
  size_color: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    height: 50,
    paddingEnd: 10,
    paddingStart: 10,
  },
  selectedSize: {
    backgroundColor: "gray",
    borderRadius: 50,
    width: "15%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeModalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "30%",
  },

  itemContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    width: screenWidth / 2,
    marginBottom: "10%",
  },
  itemImage: {
    width: 150,
    height: 300,
    marginBottom: 8,
    borderRadius: 30,
  },
  itemTitle: {
    fontSize: 16,

    textAlign: "left",
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
  },
});
