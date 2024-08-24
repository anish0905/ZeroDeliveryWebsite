import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProfileHome from '../component/Profile/ProfileHome';
import axios from 'axios';
import { API_URL } from '../conatant';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const userId = await AsyncStorage.getItem("userId");
    try {
      const resp = await axios.get(`${API_URL}/api/deliveryBoys/getById/${userId}`);
      setUserProfile(resp.data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {userProfile ? (
        <ProfileHome
          username={userProfile.name}
          userImage={userProfile.profilePhoto || "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg"}
          email={userProfile.email}
          mobile={userProfile.mobile}
          address={userProfile.address.address}
          pincode={userProfile.address.pincode}
          vehicleNo={userProfile.vehicleNo}
          isVerified={userProfile.isVerified}
          fetchUserDetails={fetchUserDetails}
        />
      ) : (
        // Add a loader or placeholder here if needed
        <View><Text>Loading...</Text></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});
