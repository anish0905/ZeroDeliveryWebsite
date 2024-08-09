import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRoute } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../conatant";
import { AntDesign } from "@expo/vector-icons";
import LocationComponent from "../component/Location";
import ShowCatogryWiseComp from "../component/ShowCatogryWiseComp";

export default function ShowCategoryWise() {
  const [products, setProducts] = useState([]);
  const route = useRoute();
  const { categoryName } = route.params;

  const modifyName = categoryName.toLowerCase();

  useEffect(() => {
    fetchProductDetails();
  }, [categoryName]);

  const fetchProductDetails = async () => {
    try {
      const resp = await axios.get(
        `${API_URL}/api/prod/category/${modifyName}`
      );
      setProducts(resp.data.data);
      // console.log(resp.data.data);
    } catch (error) {
      console.log("Error fetching products acc to category wise:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedHeader}>
        <View style={styles.searcherBar}>
          <AntDesign
            name="search1"
            size={22}
            color="black"
            style={styles.icon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Product..."
            placeholderTextColor="#888"
          />
        </View>
        <LocationComponent />
      </View>
      <View style={{ marginTop: 60 }}>
      <ShowCatogryWiseComp products={products} />
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f0f0f0',
    margin: 0,
  },
  fixedHeader: {
    position: "absolute",
    width: "100%",
    paddingTop: 40,
    zIndex: 10,
    backgroundColor: "#96D6EF",
    // backgroundColor: '#ffffff', // White background for the header
    borderBottomWidth: 1,
    borderBottomColor: "#ddd", // Light border for separation
  },
  searcherBar: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 45,
    height: 50,
    color: "black",
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  icon: {
    position: "absolute",
    left: 25,
    top: 13,
    zIndex: 1,
  },
 
});
