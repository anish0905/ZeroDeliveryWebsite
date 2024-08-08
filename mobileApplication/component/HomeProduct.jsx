import { Image, StyleSheet, Text, View, Button, FlatList } from 'react-native';
import React from 'react';
import { Link } from '@react-navigation/native';

export default function HomeProduct({ items, name }) {
  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
     
        <Image source={{ uri: item.images[0] }} style={styles.productImage} />
     
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>₹ {item.price}</Text>
       
    </View>
  );

  const addToCart = (item) => {
    // Implement your add to cart functionality here
    console.log(`Adding ${item.name} to cart`);
  };


  

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
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flatListContainer: {
    paddingBottom: 5,
  },
  productContainer: {
    flex: 1,
    backgroundColor: '#C2E5EE',
    margin: 5,
    borderRadius: 10,
    paddingBottom:10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: "50%", 
    height: "100%",
    paddingHorizontal: 5,
    paddingVertical:5,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    textOverflow: 'ellipsis',
    overflow: 'hidden',  // Truncate text if it exceeds maxWidth
    marginLeft: 10,
    textAlign: 'center',
    maxWidth: 130,
    color:'#402E7A'
  },
  price: {
    fontSize: 16,
    marginTop: 5,
    marginLeft: 10,
    color: '#4C3BCF',

    
  },
 

  
});
