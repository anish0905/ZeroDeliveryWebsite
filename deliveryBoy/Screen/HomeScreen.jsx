import { StyleSheet, SafeAreaView, ScrollView, TextInput, View, Text, Alert, Image, TouchableOpacity, Linking, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from "@expo/vector-icons/AntDesign";
import Location from "../component/Location";
import axios from 'axios';
import { API_URL } from '../conatant'; // Corrected import path
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen() {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false); // State to control OTP modal visibility
  const [selectedOrderId, setSelectedOrderId] = useState(''); // State to store the selected order ID
  const [otp, setOtp] = useState(''); // State to manage OTP input

  const navigate = useNavigation(); // Corrected typo

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
      const incomingOrder = response.data.filter(order => order.status.toLowerCase() != 'delivered');
      setOrders(incomingOrder);
     
    } catch (error) {
      console.log('Error fetching orders:', error);
      Alert.alert('Error', 'Failed to fetch orders.');
    }
  };

  const handleDelivered = (orderId) => {
    setSelectedOrderId(orderId); // Set the order ID
    setShowOtpModal(true); // Show the OTP modal
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/deliveryBoys/deliverOrder/verifyOrder`, {
        orderId: selectedOrderId,
        otp,
      });

      Alert.alert('Success', 'Order delivered successfully.');
      setShowOtpModal(false); // Close the OTP modal on success
      fetchOrders(); // Refresh the order list
    } catch (error) {
      console.log('Error verifying OTP:', error);
      Alert.alert('Error', 'Failed to verify OTP.');
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

  const handlePhoneCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
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

                
                  <TouchableOpacity onPress={() => handlePhoneCall(order.address.phone)} style={styles.phoneContainer}>
                    <FontAwesome name="phone" size={20} color="#0080FF" />
                    <Text style={styles.phoneText}>{order.address.phone}</Text>
                  </TouchableOpacity>
                  
              

                <Text style={styles.statusText}>Status: {order.status}</Text>
                <TouchableOpacity
                  style={styles.moreButton}
                  onPress={() => handleDelivered(order._id)}
                >
                  <Text style={styles.moreButtonText}>Mark as Delivered</Text>
                </TouchableOpacity>
               
              </View>
            );
          })
        ) : (
          <Text style={styles.noOrdersText}>No orders found</Text>
        )}
      </ScrollView>

      {/* OTP Modal */}
      <Modal
        visible={showOtpModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowOtpModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter OTP</Text>
            <TextInput
              style={styles.modalInput}
              value={otp}
              onChangeText={setOtp}
              placeholder="Enter OTP"
              keyboardType="numeric"
              maxLength={6}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleVerifyOTP}>
              <Text style={styles.modalButtonText}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowOtpModal(false)}>
              <Text style={styles.modalCloseButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    zIndex: 10,
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
    fontSize: 14,
    marginBottom: 10,
  },
  statusText: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  moreButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0080FF",
    padding: 8,
    borderRadius: 5,
  },
  moreButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  noOrdersText: {
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#0080FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalCloseButton: {
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: '#0080FF',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  phoneText: {
    marginLeft: 10,
    color: '#0080FF',
  },
});
