import { StyleSheet, SafeAreaView, ScrollView, TextInput, View, Text, Alert, Image, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from "@expo/vector-icons/AntDesign";
import Location from "../component/Location";
import axios from 'axios';
import { API_URL } from '../conatant';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
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
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.log('Error fetching orders:', error);
      Alert.alert('Error', 'Failed to fetch orders.');
    }
  };

  const handleDelivered = async (orderId) => {
    try {
      await axios.put(`${API_URL}/api/orders/${orderId}/delivered`);
      Alert.alert('Success', 'Order marked as delivered.');
      fetchOrders(); // Refresh orders after updating
    } catch (error) {
      console.log('Error updating order status:', error);
      Alert.alert('Error', 'Failed to mark order as delivered.');
    }
  };

  const handleOpenGoogleMaps = (address) => {
    const query = `${address.street}, ${address.city}, ${address.state} ${address.postalCode}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedHeader}>
        <View style={styles.searchBar}>
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
        {orders.length > 0 ? (
          orders.map((order, index) => (
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
                      <Text style={styles.productText}>Price: ${product.price}</Text>
                      <Text style={styles.productText}>Quantity: {product.quantity}</Text>
                      <Text style={styles.productText}>Shipping Info: {product.productId.shippingInformation}</Text>
                      <Text style={styles.productText}>Order Date: {new Date(order.createdAt).toLocaleDateString()}</Text>
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
              <TouchableOpacity
                style={styles.moreButton}
                onPress={() => handleDelivered(order._id)}
              >
                <Text style={styles.moreButtonText}>Mark as Delivered</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noOrdersText}>No orders found</Text>
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
  fixedHeader: {
    position: 'absolute',
    width: '100%',
    paddingTop: 30,
    zIndex: 10,
    marginTop: 0,
    backgroundColor: "#96D6EF",
  },
  searchBar: {
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
    zIndex:10
  },
  scrollViewContent: {
    paddingTop: 120,
    paddingHorizontal: 10,
  },
  orderContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    marginBottom: 15,
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
  },
  moreButton: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: "center",
  },
  moreButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  noOrdersText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});
