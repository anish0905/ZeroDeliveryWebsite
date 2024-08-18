import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ProfileHome from '../component/Profile/ProfileHome';
import axios from 'axios';
import { API_URL } from '../conatant';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [userProfile, setUserProfile] = useState()

  useEffect(()=>{
    fetchUserDetails();
  }, [])
  
  const fetchUserDetails = async()=>{
    const userId = await AsyncStorage.getItem("userId");
    try {
      const resp = await axios.get(`${API_URL}/user/getGetUser/${userId}`);
      setUserProfile(resp.data)
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      
    }
  }
  return (
    <View style={styles.container}>
      <ProfileHome
      fetchUserDetails={fetchUserDetails}
        username={userProfile?.name|| "john Smith" }
        userImage="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});
