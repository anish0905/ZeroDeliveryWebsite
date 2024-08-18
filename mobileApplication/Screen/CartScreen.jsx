import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { bagActions } from '../store/bagSlice';
import { API_URL } from '../conatant';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const fetchData = async () => {
    const storedUserId = await AsyncStorage.getItem("userId");

    if (storedUserId) {
      try {
        const resp = await axios.get(`${API_URL}/api/cart/totalProductQuantity/${storedUserId}`);
        setCartItems(resp.data.data);
      } catch (error) {
        console.error("Error fetching cart data:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemove = async (itemId) => {
    const storedUserId = await AsyncStorage.getItem("userId");
    if (storedUserId) {
      try {
        await axios.post(`${API_URL}/api/cart/${storedUserId}/${itemId}`);
        dispatch(bagActions.removeFromBag({ productId: itemId }));
        setCartItems(cartItems.filter(item => item.productId !== itemId));
      } catch (error) {
        console.error("Error removing from cart:", error.message);
      }
    }
  };

  const updateQuantityLocally = (itemId, change) => {
    setCartItems(cartItems.map(item => 
      item.productId === itemId ? { ...item, quantity: item.quantity + change } : item
    ));
  };

  const increaseQuantity = async (itemId) => {
    const storedUserId = await AsyncStorage.getItem("userId");
    if (storedUserId) {
      try {
        await axios.put(`${API_URL}/api/cart/addProductQuantityByOne`, {
          userId: storedUserId,
          productId: itemId,
        });
        dispatch(bagActions.increaseQuantity({ productId: itemId }));
        updateQuantityLocally(itemId, 1); // Update state locally
      } catch (error) {
        console.error("Error increasing item quantity:", error.message);
      }
    }
  };

  const decreaseQuantity = async (itemId) => {
    const storedUserId = await AsyncStorage.getItem("userId");
    if (storedUserId) {
      try {
        await axios.put(`${API_URL}/api/cart/subProductQuantityByOne`, {
          userId: storedUserId,
          productId: itemId,
        });
        dispatch(bagActions.decreaseQuantity({ productId: itemId }));
        updateQuantityLocally(itemId, -1); // Update state locally
      } catch (error) {
        console.error("Error decreasing item quantity:", error.message);
      }
    }
  };

  const handleOnPress = () => {
    if (cartItems.length === 0) {
      Alert.alert("Cart is empty. Please add products to the cart.");
      return;
    }
    navigation.navigate("Select Address");
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: `${API_URL}/${item.Image}` }} style={styles.itemImage} />
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
        keyExtractor={(item) => item.productId.toString()}
      />
      <TouchableOpacity style={styles.placeOrderButton} onPress={handleOnPress}>
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
    justifyContent: 'flex-start',
    marginBottom: 10,
    gap: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
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
    paddingHorizontal: 12,
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
