import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '../conatant';
import { AntDesign } from '@expo/vector-icons';
import LocationComponent from '../component/Location';

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
      const resp = await axios.get(`${API_URL}/api/prod/category/${modifyName}`);
      setProducts(resp.data.data);
      console.log(resp.data.data);
    } catch (error) {
      console.log("Error fetching products acc to category wise:", error);
    }
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
        <LocationComponent/>
      </View>
      <View style={{ marginTop:60}}>
      {products.length > 0 ? (
        <FlatList
          contentContainerStyle={{ paddingTop: 100 }} 
          data={products}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Image source={{ uri: item.images[0] }} style={styles.productImage} />
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>Rs. {item.price}</Text>
            </View>
          )}
        />
        
      ) : (
        <Text style={styles.noProductsText}>No products found in this category.</Text>
      )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f0f0f0',
    margin:0,
  },
  fixedHeader: {
    position: 'absolute',
    width: '100%',
    paddingTop: 40,
    zIndex: 10,
    backgroundColor: "#96D6EF",
    // backgroundColor: '#ffffff', // White background for the header
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // Light border for separation
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
  row: {
    justifyContent: 'space-between',
     marginTop: 5,
    paddingHorizontal: 10, // Add some padding to the row
  },
  productItem: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 15, // Rounded corners for the product item
    backgroundColor: '#ffffff', // White background for product cards
    alignItems: 'center',
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10, // Rounded corners for images
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333', // Darker text color for better contrast
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  noProductsText: {
    marginTop: 100,
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
});
