import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { API_URL } from "../../conatant";
import UpdateAddress from "./UpdateAddress";
import Icon from "react-native-vector-icons/Ionicons"; // Adjust icon based on what you need
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { addressActions } from "../../store/addressSlice";

const AddressDetails = () => {
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const address = useSelector((store) => store.address.address);
  console.log(address)  // Accessing the correct state

  useEffect(() => {
    const getUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
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
      const resp = await axios.get(`${API_URL}/user/get-address/${userId}`);
      dispatch(addressActions.updateAddress({ address: resp.data.address }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (addressId) => {
    try {
      await axios.delete(`${API_URL}/api/users/address/${userId}/${addressId}`);
      fetchAddress();
      Alert.alert("Success!", "Address is deleted successfully");
    } catch (error) {
      console.log(error);
      Alert.alert("Error!", "There was an issue deleting the address");
    }
  };

  const confirmDelete = (addressId) => {
    Alert.alert(
      "Are you sure?",
      "Do you really want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, delete it!",
          onPress: () => handleDelete(addressId),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {address && address.length > 0 ? (
        <ScrollView style={{ marginBottom: 40 }}>
          {address.map((addr) => (
            <View key={addr._id} style={styles.addressContainer}>
              <View style={styles.addressDetails}>
                <View style={styles.addressHeader}>
                  <Text style={styles.addressType}>{addr.addressType} Address</Text>
                  <Icon name="checkmark-done-outline" size={24} color="#1E90FF" />
                </View>
                <View style={styles.addressInfo}>
                  <Text style={styles.addressText}>{addr.name}</Text>
                  <Text style={styles.addressText}>{addr.street}</Text>
                  <Text style={styles.addressText}>{addr.city}, {addr.state}, {addr.country}</Text>
                  <Text style={styles.addressText}>{addr.postalCode}</Text>
                  <Text style={styles.addressText}>Phone: {addr.phone}</Text>
                  {addr.location && (
                    <Text style={styles.addressText}>
                      Location: {addr.location.latitude}, {addr.location.longitude}
                    </Text>
                  )}
                </View>
                <View style={styles.actions}>
                  <UpdateAddress address={addr} fetchAddress={fetchAddress} />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => confirmDelete(addr._id)}
                  >
                    <Icon name="trash-outline" size={24} color="#FFF" />
                    <Text style={styles.deleteButtonText}>Delete Address</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noAddress}>
          <Text style={styles.noAddressText}>No address available</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Add New Address')}
      >
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 8,
  },
  addressContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  addressDetails: {
    flex: 1,
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addressType: {
    fontWeight: "bold",
    color: "#4A4A4A",
    fontSize: 16,
  },
  addressInfo: {
    marginTop: 8,
  },
  addressText: {
    fontSize: 14,
    color: "#4A4A4A",
  },
  actions: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF4500",
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "#FFF",
    marginLeft: 8,
    fontSize: 14,
  },
  noAddress: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  noAddressText: {
    fontSize: 16,
    color: "#4A4A4A",
  },
  addButton: {
    backgroundColor: "#32CD32",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default AddressDetails;
