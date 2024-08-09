import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProfileHome from '../component/Profile/ProfileHome';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ProfileHome
        username="John Doe"
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
