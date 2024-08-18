import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../../conatant';
import { addressActions } from '../../store/addressSlice';
import { useNavigation } from '@react-navigation/native';

export default function SelectAddress() {
  const address = useSelector((store) => store.address.address);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      setUserId(storedUserId);
    };

    getUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchAddress();
    }
  }, [userId]);

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/get-address/${userId}`);
      dispatch(addressActions.updateAddress({ address: response.data.address }));
    } catch (error) {
      console.log('Error fetching addresses:', error);
    }
  };

  const handleSelectAddress = async (addr) => {
    setSelectedAddress(addr._id);
    try {
      await AsyncStorage.setItem('selectedAddress', JSON.stringify(addr));
      Alert.alert('Address Selected', 'Your address has been selected successfully.');
    } catch (error) {
      console.error('Failed to store the address in local storage', error);
    }
  };

  const handleProceed = () => {
    if (!selectedAddress) {
      Alert.alert('Error', 'Please select an address.');
      return;
    }
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.container}>
      {address && address.length > 0 ? (
        <>
          <ScrollView style={{ marginBottom: 40 }}>
            {address.map((addr) => (
              <TouchableOpacity
                key={addr._id}
                style={[
                  styles.addressContainer,
                  selectedAddress === addr._id && styles.selectedAddress,
                ]}
                onPress={() => handleSelectAddress(addr)}
              >
                <View style={styles.addressDetails}>
                  <Text style={styles.addressType}>{addr.addressType} Address</Text>
                  <View style={styles.addressInfo}>
                    <Text style={styles.addressText}>{addr.name}</Text>
                    <Text style={styles.addressText}>{addr.street}</Text>
                    <Text style={styles.addressText}>
                      {addr.city}, {addr.state}, {addr.country}
                    </Text>
                    <Text style={styles.addressText}>{addr.postalCode}</Text>
                    <Text style={styles.addressText}>Phone: {addr.phone}</Text>
                    {addr.location && (
                      <Text style={styles.addressText}>
                        Location: {addr.location.latitude}, {addr.location.longitude}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.updateButton} onPress={() => navigation.navigate('Address')}>
              <Text style={styles.buttonText}>Update Address</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
              <Text style={styles.buttonText}>Proceed to Payment</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.noAddress}>
          <Text style={styles.noAddressText}>No address available</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Add New Address')}
          >
            <Text style={styles.addButtonText}>Add New Address</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  selectedAddress: {
    borderColor: '#32CD32',
    backgroundColor: '#F0FFF0',
  },
  addressDetails: {
    flex: 1,
  },
  addressType: {
    fontWeight: 'bold',
    color: '#4A4A4A',
    fontSize: 16,
  },
  addressInfo: {
    marginTop: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#4A4A4A',
  },
  noAddress: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noAddressText: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'col',
    justifyContent: 'space-between',
    position: 'absolute',
    gap:2,
    bottom: 16,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  updateButton: {
    backgroundColor: '#32CD32',
    padding: 12,
    borderRadius: 4,
    flex: 1,
    alignItems: 'center',
    
    
    
  },
  proceedButton: {
    backgroundColor: '#FC4100',
    padding: 12,
    borderRadius: 4,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#32CD32',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
