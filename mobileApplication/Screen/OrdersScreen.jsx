import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../conatant';

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userId, setUserId] = useState(null); // Initialize userId state
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
          const response = await axios.get(`${API_URL}/api/products/getHistory/${storedUserId}`);
          const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setOrders(sortedOrders);
        } else {
          Alert.alert('Error', 'User ID not found');
        }
      } catch (error) {
        Alert.alert('Error', 'Error fetching data');
      }
    };

    fetchData();
  }, []); // Only run on mount

  const calculateExpectedDate = (createdAt, shippingInfo) => {
    const createdDate = new Date(createdAt);
    let expectedDate = new Date(createdDate);

    // Assuming shippingInfo format is like "Ships in 1-2 business days"
    const match = shippingInfo.match(/\d+/g);
    if (match) {
      const minDays = parseInt(match[0], 10);
      const maxDays = parseInt(match[1], 10) || minDays;

      // Calculate expected delivery date
      expectedDate.setDate(createdDate.getDate() + minDays);
      return expectedDate.toDateString(); // Format expected date as needed
    }

    return "N/A";
  };

  const filteredOrders = orders.filter(order =>
    order.products[0].productId.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePress = (orderId) => {
    navigation.navigate('Order Details', { id:orderId });
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.orderContainer}
      onPress={() => handlePress(item._id)}
    >
      <View style={styles.orderContent}>
        <Image
          source={{ uri: `${API_URL}/${item.products[0].productId.thumbnail}` }}
          style={styles.thumbnail}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{item.products[0].productId?.title}</Text>
          <Text style={styles.price}>Price: ₹{item.products[0].price}</Text>
          <Text style={styles.shipping}>Shipping: {item.products[0].productId.shippingInformation}</Text>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <Text style={[styles.status, { color: item.status === 'pending' ? 'red' : 'green' }]}>
          {item.status}
        </Text>
        <Text style={styles.paymentStatus}>
          Payment: {item.paymentStatus === 'unpaid' ? 'Not Successful' : 'Successful'}.
        </Text>
        <Text style={styles.expectedDelivery}>
          Expected Delivery: {calculateExpectedDate(item.createdAt, item.products[0].productId.shippingInformation)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search your orders here"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      {filteredOrders.length === 0 ? (
        <View style={styles.noOrdersContainer}>
          <Text style={styles.noOrdersText}>No orders found.</Text>
          <TouchableOpacity style={styles.goHomeButton} onPress={handleGoHome}>
            <Text style={styles.goHomeButtonText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
  },
  list: {
    flexGrow: 1,
  },
  orderContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 8,
  },
  orderContent: {
    flexDirection: 'row',
  },
  thumbnail: {
    width: '50%',  // Image takes up half the width
    height: 120,
    borderRadius: 8,
  },
  details: {
    width: '50%',  // Info takes up the other half
    paddingLeft: 16,
    justifyContent: 'center',
    flexShrink: 1, // Allow the details to shrink if necessary
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flexWrap: 'wrap', // Wrap text if it’s too long
  },
  price: {
    color: '#666',
    flexWrap: 'wrap', // Wrap text if it’s too long
  },
  shipping: {
    color: '#888',
    flexWrap: 'wrap', // Wrap text if it’s too long
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentStatus: {
    color: '#007bff',
  },
  expectedDelivery: {
    color: '#666',
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrdersText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  goHomeButton: {
    padding: 12,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  goHomeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});


export default OrdersScreen;
