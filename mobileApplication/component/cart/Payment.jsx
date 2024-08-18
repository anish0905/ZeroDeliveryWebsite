import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { API_URL } from '../../conatant'; // Fixed typo
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { bagActions } from '../../store/bagSlice';

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [userId, setUserId] = useState('');
  const [address, setAddress] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        const storedAddress = await AsyncStorage.getItem('selectedAddress');
        setUserId(storedUserId);
        setAddress(JSON.parse(storedAddress));
       
      } catch (error) {
        console.error('Error getting userId or address:', error);
      }
    };

    getUserId();
  }, []);

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const fetchCart = async () => {
    setLoading(true); // Start loading
    console.log(userId);
    
    try {
      const resp = await axios.get(`${API_URL}/api/cart/${userId}`);
      
      setCartItems(resp.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      Alert.alert('Error', 'Failed to fetch cart items.');
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await axios.post(`${API_URL}/api/cart/${userId}/${itemId}`);
      dispatch(bagActions.removeFromBag({ productId: itemId }));
      fetchCart(); // Fetch updated cart after removing item
     
      navigation.navigate('My Order');
    } catch (error) {
      console.error("Error removing from cart:", error.message);
      Alert.alert('Error', 'Something went wrong while removing the item. Please try again.');
    }
  };

  const handlePaymentSelection = (method) => {
    setSelectedMethod(method);
  };

  const handlePlaceOrder = async () => {
    if (!selectedMethod) {
      Alert.alert('Select Payment Method', 'Please select a payment method before placing the order.');
      return;
    }

    if (selectedMethod === 'Cash on Delivery') {
      const products = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));

      const orderData = {
        userId,
        address: address._id,
        products,
        paymentMethod: selectedMethod,
        paymentStatus: 'unpaid',
        status: 'pending',
        VendorUser: cartItems[0]?.VendorUser,
      };

      try {
        setLoading(true); // Start loading
        await axios.post(`${API_URL}/api/products/orderProduct`, orderData);
        Alert.alert('Order Placed', 'Your order has been successfully placed!', [
          { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]);
        cartItems.forEach((item) => handleRemove(item.productId));
      } catch (error) {
        console.error('Order placement failed', error);
        Alert.alert('Error', 'Failed to place order. Please try again.');
      } finally {
        setLoading(false); // End loading
      }
    } else {
      Alert.alert('Proceeding to Payment', `Redirecting to ${selectedMethod} payment...`);
      // Implement other payment methods here
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment Method</Text>

      <TouchableOpacity
        style={[styles.option, selectedMethod === 'UPI' && styles.selectedOption]}
        onPress={() => handlePaymentSelection('UPI')}
      >
        <Icon name="qrcode-scan" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.optionText}>UPI</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, selectedMethod === 'Cash on Delivery' && styles.selectedOption]}
        onPress={() => handlePaymentSelection('Cash on Delivery')}
      >
        <Icon name="truck-delivery" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.optionText}>Cash on Delivery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, selectedMethod === 'Net Banking' && styles.selectedOption]}
        onPress={() => handlePaymentSelection('Net Banking')}
      >
        <Icon name="bank" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.optionText}>Net Banking</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, selectedMethod === 'Card' && styles.selectedOption]}
        onPress={() => handlePaymentSelection('Card')}
      >
        <Icon name="credit-card" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.optionText}>Card</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#28a745" style={styles.loader} />
      ) : (
        selectedMethod !== '' && (
          <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
            <Text style={styles.placeOrderText}>Place Order</Text>
          </TouchableOpacity>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#0056b3',
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeOrderButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
});
