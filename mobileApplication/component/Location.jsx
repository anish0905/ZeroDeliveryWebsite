import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Octicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import AddressModal from './AddressModal'; // Import your AddressModal component

export default function LocationComponent() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setIsLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Reverse geocode to get address
      let [result] = await Location.reverseGeocodeAsync(location.coords);
      setAddress(result);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSaveAddress = (newAddress) => {
    // Update the address with the new one provided by the user
    setAddress({ ...address, ...newAddress }); // Adjust according to your data structure
  };

  const region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="location-on" size={24} color="black" />
      </View>
      <View style={styles.info}>
        <Text style={styles.text}>
          Deliver to{" "}
          {address
            ? `${address.street}, ${address.city}`
            : "Fetching address..."}
        </Text>
      </View>
      <TouchableOpacity onPress={handleOpenModal} style={styles.iconContainer}>
        <Octicons name="chevron-down" size={24} color="black" />
      </TouchableOpacity>
      <AddressModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveAddress}
        currentAddress={address} // Pass current address to the modal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#BFE4F0",
    justifyContent: 'flex-start',
    alignItems: "center",
  },
  info: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  text: {
    fontSize: 12,
    color: "#000",
  },
  iconContainer: {
    backgroundColor: "#BFE4F0",
    borderRadius: 50,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});
