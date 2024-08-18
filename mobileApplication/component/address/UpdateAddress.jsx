import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo
import axios from 'axios';
import { API_URL } from "../../conatant";
import AsyncStorage from '@react-native-async-storage/async-storage';


const UpdateAddress = ({ address, fetchAddress }) => {
  const [addressType, setAddressType] = useState('Home');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userId, setUserId] = useState(null); // Assuming you're using AsyncStorage

  const addressId = address._id;

  useEffect(() => {
    const getUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      setUserId(storedUserId);
    };

    getUserId();
  }, []);
 
  useEffect(() => {
    if (address) {
      setAddressType(address.addressType || 'Home');
      setStreet(address.street || '');
      setCity(address.city || '');
      setState(address.state || '');
      setCountry(address.country || '');
      setPostalCode(address.postalCode || '');
      setName(address.name || '');
      setPhone(address.phone || '');
    }
  }, [address]);

  const handleAddressTypeClick = (type) => {
    setAddressType(type);
  };

  const handleOnSubmit = async () => {
    console.log('onSubmit',userId);
    const updatedAddress = { addressType, street, city, state, country, postalCode, name, phone };
    
    try {
      await axios.put(`${API_URL}/api/users/address/${userId}/${addressId}`, updatedAddress);
      fetchAddress();
      setIsModalVisible(false);
      Alert.alert('Success!', 'Address updated successfully');
    } catch (error) {
      console.error('Error updating address:', error);
      Alert.alert('Error!', 'There was an issue updating the address');
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={styles.updateButton}
      >
        <Ionicons name="pencil-outline" size={20} color="white" />
        <Text style={styles.updateButtonText}>Update Address</Text>
      </TouchableOpacity>
      
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Update Address</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.addressTypeButton, addressType === 'Home' && styles.selectedButton]}
                onPress={() => handleAddressTypeClick('Home')}
              >
                <Ionicons name="home-outline" size={20} color={addressType === 'Home' ? 'blue' : 'gray'} />
                <Text style={styles.addressTypeText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.addressTypeButton, addressType === 'Work' && styles.selectedButton]}
                onPress={() => handleAddressTypeClick('Work')}
              >
                <Ionicons name="briefcase-outline" size={20} color={addressType === 'Work' ? 'blue' : 'gray'} />
                <Text style={styles.addressTypeText}>Work</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.addressTypeButton, addressType === 'Hotel' && styles.selectedButton]}
                onPress={() => handleAddressTypeClick('Hotel')}
              >
                <Ionicons name="bed-outline" size={20} color={addressType === 'Hotel' ? 'blue' : 'gray'} />
                <Text style={styles.addressTypeText}>Hotel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.addressTypeButton, addressType === 'Other' && styles.selectedButton]}
                onPress={() => handleAddressTypeClick('Other')}
              >
                <Ionicons name="location-outline" size={20} color={addressType === 'Other' ? 'blue' : 'gray'} />
                <Text style={styles.addressTypeText}>Other</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Street"
              value={street}
              onChangeText={setStreet}
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
            <TextInput
              style={styles.input}
              placeholder="State"
              value={state}
              onChangeText={setState}
            />
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
            />
            <TextInput
              style={styles.input}
              placeholder="Postal Code"
              value={postalCode}
              onChangeText={setPostalCode}
            />
            <TextInput
              style={styles.input}
              placeholder="Your name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone number (optional)"
              value={phone}
              onChangeText={setPhone}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={styles.cancelButton}
              >
                <Ionicons name="close-circle-outline" size={20} color="white" />
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleOnSubmit}
                style={styles.saveButton}
              >
                <Ionicons name="checkmark-circle-outline" size={20} color="white" />
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 5,
  },
  updateButtonText: {
    color: 'white',
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    marginBottom: 20,
    overflow: 'hidden',
    flexWrap: 'wrap',
    marginBottom: 20,
    overflow: 'hidden',
    flexWrap: 'wrap',
    
    gap:5
    
  },
  addressTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  selectedButton: {
    backgroundColor: '#f0f0f0',
  },
  addressTypeText: {
    marginLeft: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4500',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
    marginLeft: 5,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    marginLeft: 5,
  },
});

export default UpdateAddress;
