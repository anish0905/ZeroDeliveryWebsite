import { StyleSheet, SafeAreaView, ScrollView, TextInput, View, Text, Alert, Image, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../conatant'; // Corrected import path

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        setUserId(storedUserId);
      } catch (error) {
        console.log('Failed to fetch user ID from AsyncStorage:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/deliveryBoys/${userId}`);
      const deliveredOrders = response.data.filter(order => order.status.toLowerCase() === 'delivered');
      setOrders(deliveredOrders);
    } catch (error) {
      console.log('Error fetching orders:', error);
      Alert.alert('Error', 'Failed to fetch orders.');
    }
  };

  const handleOpenGoogleMaps = (address) => {
    const query = `${address.street}, ${address.city}, ${address.state} ${address.postalCode}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    Linking.openURL(url);
  };

  const calculateShippingInformation = (createdAt) => {
    const orderDate = new Date(createdAt);
    const expectedDeliveryDate = new Date(orderDate);
    expectedDeliveryDate.setDate(orderDate.getDate() + 5); // Adding 5 days for delivery

    return {
      orderDate: orderDate.toLocaleDateString(),
      expectedDelivery: expectedDeliveryDate.toLocaleDateString(),
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      
        <View style={styles.searchBar}>
          <AntDesign name="search1" size={22} color="black" style={styles.icon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Product..."
            placeholderTextColor="#888"
          />
        
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {orders.length > 0 ? (
          orders.map((order, index) => {
            const shippingInfo = calculateShippingInformation(order.createdAt);

            return (
              <View key={index} style={styles.orderContainer}>
                <Text style={styles.orderTitle}>Order ID: {order._id}</Text>
                <View style={styles.productsContainer}>
                  <Text style={styles.sectionTitle}>Products:</Text>
                  {order.products.map((product, prodIndex) => (
                    <View key={prodIndex} style={styles.productContainer}>
                      <Image
                        source={{ uri: `${API_URL}/${product.productId.thumbnail}` }}
                        style={styles.productImage}
                      />
                      <View style={styles.productDetails}>
                        <Text style={styles.productText}>{product.productId.title}</Text>
                        <Text style={styles.productText}>Price: ₹{product.price}</Text>
                        <Text style={styles.productText}>Quantity: {product.quantity}</Text>
                        <Text style={styles.productText}>Order Date: {shippingInfo.orderDate}</Text>
                        <Text style={styles.productText}>Expected Delivery: {shippingInfo.expectedDelivery}</Text>
                      </View>
                    </View>
                  ))}
                </View>
                <TouchableOpacity onPress={() => handleOpenGoogleMaps(order.address)}>
                  <Text style={styles.addressText}>
                    Address: {order.address.name}, {order.address.phone}, {order.address.street}, {order.address.city}, {order.address.state} - {order.address.postalCode}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.statusText}>Status: {order.status}</Text>
              </View>
            );
          })
        ) : (
          <Text style={styles.noOrdersText}>No delivered orders found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10, // Added top margin
  },
  searchInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 35,
    height: 40,
    color: "#333", // Updated text color
    fontWeight: "bold",
  },
  icon: {
    position: "absolute",
    left: 15,
    zIndex: 5,
    color: "#007AFF", // Updated icon color
  },
  scrollViewContent: {
    paddingTop: 20, // Adjust padding if necessary
    paddingHorizontal: 10,
  },
  orderContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom:10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  productsContainer: {
    marginBottom: 10,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    
  },
  productImage: {
    width: 70,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productText: {
    marginBottom: 2,
  },
  addressText: {
    marginBottom: 10,
    fontStyle: "italic",
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  statusText: {
    color: "#4CAF50",
    fontWeight: "bold",
    marginTop: 10,
  },
  noOrdersText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

