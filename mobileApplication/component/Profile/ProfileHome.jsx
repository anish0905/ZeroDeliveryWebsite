import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileHome = ({ username, userImage }) => {
  return (
    <>
     <View style={styles.profile}>
        <Image source={{ uri: userImage }} style={styles.image} />
        <Text style={styles.greeting}>Hello, {username}!</Text>
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
    backgroundColor: '#f0f0f0',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
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
    color: '#333',
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
    borderWidth: 2, // Border width
    borderColor: 'black', // Border color
    fontSize: 16,
 textAlign: 'center',
    marginBottom: 8,
    color: '#333',
    padding: 4,
    color: '#666',
  },
  subHeading: {
    borderRadius: 8,
    backgroundColor: '#f8f9fa', // Light gray background color
    textAlign: 'center',
    borderWidth: 2, // Border width
    borderColor: 'black', // Border color
    fontSize: 16,
    color: '#666',
    padding: 4,
  },
});

export default ProfileHome;
