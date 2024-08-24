import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../conatant';
import axios from 'axios';

const ProfileHome = ({
  username,
  userImage,
  email,
  mobile,
  address,
  pincode,
  vehicleNo,
  isVerified,
  fetchUserDetails
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const navigation = useNavigation();

  // Logout function
  const handleLogout = async () => {
    try {
      // Clear user data from AsyncStorage
      await AsyncStorage.clear();
      Alert.alert('Logged Out', 'You have been logged out successfully.');
      // Navigate to the login screen or home screen
      navigation.navigate('Login'); // Replace 'Login' with your actual login screen name
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Save new username function
  const handleSaveUsername = async () => {
    try {
      // Update the username in the backend
      await axios.put(`${API_URL}/api/deliveryBoys/update/${userId}`, { name: newUsername });
      // Refresh user details
      fetchUserDetails();
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving username:', error);
    }
  };

  return (
    <>
      <View style={styles.profile}>
        <Image source={{ uri: userImage }} style={styles.image} />
        {isEditing ? (
          <TextInput
            style={styles.usernameInput}
            value={newUsername}
            onChangeText={setNewUsername}
            onSubmitEditing={handleSaveUsername}
            autoFocus
          />
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.username}>{newUsername}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <Entypo name="log-out" size={24} color={"white"} />
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>Email: {email}</Text>
        <Text style={styles.detail}>Mobile: {mobile}</Text>
        <Text style={styles.detail}>Address: {address}</Text>
        <Text style={styles.detail}>Pincode: {pincode}</Text>
        <Text style={styles.detail}>Vehicle No: {vehicleNo}</Text>
        <Text style={styles.detail}>Verified: {isVerified ? "Yes" : "No"}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 16,
    backgroundColor: '#96D6EF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    paddingTop: 32,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  username: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  usernameInput: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginRight: 16,
    flex: 1,
  },
  logout: {
    padding: 8,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
});

export default ProfileHome;
