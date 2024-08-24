import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_URL } from '../conatant';

export default function OTP({ route, navigation }) {
  const { orderId } = route.params;
  const [otp, setOtp] = useState('');

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/deliveryBoys/deliverOrder/verifyOrder`, { // Corrected typo
        orderId,
        otp,
      });

    
        Alert.alert('Success', 'Order delivered successfully.'); // Updated message
        navigation.goBack();
      
    } catch (error) {
      console.log('Error verifying OTP:', error);
      Alert.alert('Error', 'Failed to verify OTP.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        style={styles.input}
        value={otp}
        onChangeText={setOtp}
        placeholder="Enter OTP"
        keyboardType="numeric"
        maxLength={6}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
