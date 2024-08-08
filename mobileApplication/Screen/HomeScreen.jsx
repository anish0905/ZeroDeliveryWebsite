import { StyleSheet, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from "@expo/vector-icons/AntDesign";
import Location from "../component/Location";
import Catogry from '../component/Catogry';
import HomeProduct from '../component/HomeProduct';
import axios from 'axios';
import { API_URL } from '../conatant';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const resp = await axios.get(`${API_URL}/api/products/`);
      setProducts(resp.data);
     
    } catch (error) {
      console.error(error);
    }
  };

  const getUniqueCategories = (products) => {
    const categories = products?.map(product => product.category);
    return [...new Set(categories)];
  };

  const categories = getUniqueCategories(products);

  const filterProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  const transformCategoryName = (category) => {
    // Implement your category name transformation logic here if needed
    return category;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedHeader}>
        <View style={styles.searcherBar}>
          <AntDesign name="search1" size={22} color="black" style={styles.icon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Product..."
            placeholderTextColor="#888"
          />
        </View>
        <Location />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Catogry />
        {categories.length > 0 && categories.map(category => (
          <HomeProduct
            key={category}
            name={transformCategoryName(category)}
            items={filterProductsByCategory(category)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixedHeader: {
    position: 'absolute',
    width: '100%',
    paddingTop:30,
    zIndex: 10,
    marginTop:0,
    backgroundColor: "#96D6EF" // Adjust the background color as needed
  },
  searcherBar: {
    flexDirection: "row",
    alignItems: "center",
   
    padding: 10,
    
  },
  searchInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 35,
    height: 40,
    color: "black",
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  icon: {
    position: "absolute",
    left: 30,
    top: 20,
    zIndex: 1,
  },
  scrollViewContent: {
    paddingTop: 120, // Adjust this value based on the height of the fixed header
  },
});
