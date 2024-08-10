import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import * as Updates from 'expo-updates'; // Import expo-updates
import { API_URL } from '../conatant'; // Ensure this path is correct

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      setUserId(storedUserId);

      try {
        const resp = await axios.get(
          `${API_URL}/api/cart/totalProductQuantity/${storedUserId}`
        );
        setCartItems(resp.data.data);
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchData();
  }, []);

  const handleRemove = async (itemId) => {
    const storedUserId = await AsyncStorage.getItem("userId");
    try {
      await axios.post(`${API_URL}/api/cart/${storedUserId}/${itemId}`);
      setCartItems(prevItems => prevItems.filter(item => item.productId !== itemId));
      await Updates.reloadAsync(); // Trigger a full app reload
    } catch (error) {
      console.error("Error removing from cart:", error.message);
    }
  };

  const increaseQuantity = (itemId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.productId === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = async (itemId) => {
    const updatedItems = cartItems.map(item =>
      item.productId === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    const filteredItems = updatedItems.filter(item => item.quantity > 0);

    setCartItems(filteredItems);

    const itemToUpdate = updatedItems.find(item => item.productId === itemId);
    if (itemToUpdate && itemToUpdate.quantity <= 1) {
      await handleRemove(itemId); // Remove from server if quantity is 1 or less
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.Image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.productName}</Text>
        <View style={styles.priceContainer}>
        <Text style={styles.itemPrice}>₹ {(item.price) * (item.quantity)}</Text>
        <Text style={styles.discountPercentage}>
            ({item.discountPercentage}% OFF)
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.productId)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item.productId)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.productId}
      />
      <TouchableOpacity style={styles.placeOrderButton}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#EEEDEB',
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemImage: {
    width: 200,
    height: 100,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent:'flex-start',
    marginBottom: 10,
    gap:5
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  discountPercentage: {
    fontSize: 12,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#ddd',
    padding: 5,
    paddingHorizontal:12,
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  placeOrderButton: {
    backgroundColor: '#3ABEF9',
    paddingVertical: 15,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
