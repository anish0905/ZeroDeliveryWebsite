import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileHome = ({ username, userImage }) => {
  const navigation = useNavigation();

  // Logout function
  const handleLogout = async () => {
    try {
      // Clear user data from AsyncStorage
      await AsyncStorage.clear();
      
      Alert.alert('Logged Out', 'You have been logged out successfully.');
      // Navigate to the login screen or home screen
      navigation.navigate('Login'); // Replace 'LoginScreen' with your actual login screen name
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <View style={styles.profile}>
        <Image source={{ uri: userImage }} style={styles.image} />
        <Text style={styles.greeting}>Hello, {username}!</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <Entypo name="log-out" size={24} color={"white"} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {/* Profile Section */}

        {/* Your Orders Section */}
        <View style={styles.column}>
          <Text style={styles.heading}>Your Orders</Text>
          <Text style={styles.subHeading}>Buy Again</Text>
        </View>

        {/* Your Account Section */}
        <View style={styles.column}>
          <Text style={styles.heading}>Your Account</Text>
          <Text style={styles.subHeading}>Your Lists</Text>
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
    justifyContent:"space-between",
    marginBottom: 10,
    padding: 16,
    backgroundColor: '#96D6EF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    paddingTop:32,
    
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    borderRadius: 2,
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
