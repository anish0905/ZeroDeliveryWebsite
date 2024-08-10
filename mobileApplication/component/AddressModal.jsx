import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const AddressModal = ({ visible, onClose, onSave, currentAddress }) => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    name: '',
    phone: '',
    addressType: ''
  });

  useEffect(() => {
    if (currentAddress) {
      setAddress(currentAddress);
    }
  }, [currentAddress]);

  const handleSave = () => {
    onSave(address);
    onClose();
  };

  const handleChange = (field, value) => {
    setAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <ScrollView 
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Enter New Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Street"
            value={address.street}
            onChangeText={(text) => handleChange('street', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={address.city}
            onChangeText={(text) => handleChange('city', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            value={address.state}
            onChangeText={(text) => handleChange('state', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Country"
            value={address.country}
            onChangeText={(text) => handleChange('country', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Postal Code"
            value={address.postalCode}
            onChangeText={(text) => handleChange('postalCode', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={address.name}
            onChangeText={(text) => handleChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={address.phone}
            onChangeText={(text) => handleChange('phone', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Address Type (e.g., Home, Work)"
            value={address.addressType}
            onChangeText={(text) => handleChange('addressType', text)}
          />
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={onClose} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
});

export default AddressModal;
