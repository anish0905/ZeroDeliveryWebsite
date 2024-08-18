import { Image, StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { Link } from "@react-navigation/native";
import { API_URL } from "../conatant";

export default function HomeProduct({ items, name }) {
  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Link to={{ screen: "Product", params: { item: item } }} style={styles.imgContainer}>
  
        <Image
          source={{ uri: `${API_URL}/${item.images[0]}` }}
          style={styles.productImage}
          // Logs any image loading errors
        />
      </Link>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>₹ {item.price}</Text>
    </View>
  );

  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{name}</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    padding: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  flatListContainer: {
    paddingBottom: 5,
  },
  productContainer: {
    backgroundColor: "#C2E5EE",
    margin: 5,
    borderRadius: 10,
    paddingBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: 150, 
    
  },
  imgContainer: {
    width: "100%",
    height: 150,

    marginBottom: 10,
    
  },
  productImage: {
    width: 150,
    height: 100,
    resizeMode: "cover",
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
    maxWidth: "90%",
    color: "#402E7A",
  },
  price: {
    fontSize: 16,
    marginTop: 5,
    color: "#4C3BCF",
  },
});
