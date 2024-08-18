import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../conatant';
import axios from 'axios';

const ProfileHome = ({ username, userImage,fetchUserDetails }) => {
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

  // Save the new username
  const handleSaveUsername = async () => {
    const userId = await AsyncStorage.getItem("userId");
    try {
      const resp = await axios.post(`${API_URL}/user/addname/${userId}`,{
        name: newUsername
      });
     
      fetchUserDetails()
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      
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
      <View style={styles.container}>
        {/* Profile Section */}
        
        {/* Your Orders Section */}
        <View style={styles.column}>
          <TouchableOpacity onPress={() => navigation.navigate("My Order")}>
            <Text style={styles.heading}>Your Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.subHeading}>Buy Again</Text>
          </TouchableOpacity>
        </View>

        {/* Your Account Section */}
        <View style={styles.column}>
          <TouchableOpacity>
            <Text style={styles.heading}>Your Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Address")}>
            <Text style={styles.subHeading}>Your Address</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#96D6EF',
  },
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  column: {
    flex: 1,
    marginHorizontal: 8,
    padding: 16,
    borderRadius: 8,
  },
  heading: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'black',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
    padding: 4,
    color: '#666',
  },
  subHeading: {
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'black',
    fontSize: 16,
    color: '#666',
    padding: 4,
  },
  logout: {
    padding: 8,
  },
});

export default ProfileHome;
