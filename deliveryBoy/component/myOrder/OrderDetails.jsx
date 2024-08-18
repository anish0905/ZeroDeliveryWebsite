import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '../../conatant';

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products/getorder/${id}`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
        Alert.alert('Error', 'Error fetching order details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetails();
    } else {
      Alert.alert('Error', 'No order ID found in URL');
      setLoading(false);
    }
  }, [id]);

  const cancelOrder = async () => {
    try {
      await axios.put(`${API_URL}/api/products/cancelOrder/${id}`);
      const response = await axios.get(`${API_URI}/api/products/getorder/${id}`);
      setOrderDetails(response.data);
      Alert.alert('Success', 'Order cancelled successfully');
    } catch (error) {
      Alert.alert('Error', 'Error cancelling order');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!orderDetails) {
    return <Text>No order details available.</Text>;
  }

  const { products, address, status, paymentMethod, paymentStatus, createdAt } = orderDetails;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Order Details</Text>
        <Text style={styles.text}>Order ID: {id}</Text>
        <Text style={styles.text}>Payment Method: {paymentMethod}</Text>
        <Text style={styles.text}>Payment Status: {paymentStatus}</Text>
        <Text style={styles.text}>Order Date: {new Date(createdAt).toLocaleDateString()}</Text>
       
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Delivery Address</Text>
        <Text style={styles.text}>{address?.name || 'Name not available'}</Text>
        <Text style={styles.text}>{address?.street || 'Street not available'}</Text>
        <Text style={styles.text}>{address?.city || 'City not available'}, {address?.state || 'State not available'}</Text>
        <Text style={styles.text}>{address?.country || 'Country not available'} - {address?.postalCode || 'Postal Code not available'}</Text>
        <Text style={styles.text}>Phone number: {address?.phone || 'Phone number not available'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>More actions</Text>
        <Button title="Share order details" onPress={() => Alert.alert('Share', 'Share functionality not implemented')} />
      </View>

      {products?.map((product) => (
        <View key={product._id} style={styles.productContainer}>
          <Image
            source={{ uri: product.productId.thumbnail }}
            style={styles.thumbnail}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productTitle}>{product.productId.title}</Text>
            <Text style={styles.text}>Seller: {product.productId.seller || 'Unknown'}</Text>
            <Text style={styles.productPrice}>₹{product.price} <Text style={styles.offer}>2 Offers Applied</Text></Text>
            <Text style={styles.text}>Quantity: {product.quantity}</Text>
            <Button title="Cancel" onPress={cancelOrder} color="blue" />
          </View>
        </View>
      ))}

      <View style={styles.statusContainer}>
        <Text style={styles.status}>Order Confirmed</Text>
        <Text style={styles.text}>{new Date(createdAt).toLocaleDateString()}</Text>
        {/* Implement StatusBar component for React Native if needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginHorizontal: 16,
  

  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  section: {
    marginBottom: 16,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  offer: {
    color: 'green',
  },
  statusContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default OrderDetails;
