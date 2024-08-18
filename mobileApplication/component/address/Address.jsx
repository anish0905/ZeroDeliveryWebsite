import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import * as Location from "expo-location";
import axios from "axios";
import { API_URL } from "../../conatant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { addressActions } from "../../store/addressSlice";


export default function AddressManager({ navigation }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedType, setSelectedType] = useState("Home");
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    name: "",
    phone: "",
    addressType: "Home",
    location: {
      lat: null,
      lng: null,
    },
  });

  const dispatch = useDispatch(); // Initialize dispatch hook

  const handleInputChange = (field, value) => {
    setNewAddress({ ...newAddress, [field]: value });
  };

  const addAddress = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      alert("Please login first");
      return;
    }
    try {
      const resp = await axios.post(
        `${API_URL}/api/users/address/${userId}`,
        newAddress
      );
      alert("Address added successfully");
      navigation.navigate("Address");
      setAddresses([...addresses, newAddress]);

      // Dispatch the updateAddress action to update the Redux state
      dispatch(addressActions.updateAddress({ address: newAddress }));

      // Reset the address form
      setNewAddress({
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        name: "",
        phone: "",
        addressType: "Home",
        location: { lat: null, lng: null },
      });
    } catch (error) {
      console.log(error);
      alert("Failed to add address");
    }
  };

  const fetchCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let [result] = await Location.reverseGeocodeAsync(location.coords);
    setNewAddress({
      ...newAddress,
      street: result.street,
      city: result.city,
      state: result.region,
      country: result.country,
      postalCode: result.postalCode,
      location: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const renderIcon = (addressType) => {
    const iconColor = addressType === selectedType ? "blue" : "black";
    switch (addressType) {
      case "Home":
        return <MaterialIcons name="home" size={24} color={iconColor} />;
      case "Office":
        return <MaterialIcons name="work" size={24} color={iconColor} />;
      case "Hotel":
        return <FontAwesome5 name="hotel" size={24} color={iconColor} />;
      case "Hospital":
        return (
          <MaterialIcons name="local-hospital" size={24} color={iconColor} />
        );
      default:
        return (
          <MaterialIcons name="location-city" size={24} color={iconColor} />
        );
    }
  };

  const handleAddressTypeSelection = (type) => {
    setSelectedType(type);
    handleInputChange("addressType", type);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.addressTypeContainer}>
        <TouchableOpacity onPress={() => handleAddressTypeSelection("Home")}>
          <View style={styles.iconContainer}>
            {renderIcon("Home")}
            <Text>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAddressTypeSelection("Office")}>
          <View style={styles.iconContainer}>
            {renderIcon("Office")}
            <Text>Office</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAddressTypeSelection("Hotel")}>
          <View style={styles.iconContainer}>
            {renderIcon("Hotel")}
            <Text>Hotel</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleAddressTypeSelection("Hospital")}
        >
          <View style={styles.iconContainer}>
            {renderIcon("Hospital")}
            <Text>Hospital</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Button title="Use Current Location" onPress={fetchCurrentLocation} />

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newAddress.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Street"
        value={newAddress.street}
        onChangeText={(text) => handleInputChange("street", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={newAddress.city}
        onChangeText={(text) => handleInputChange("city", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={newAddress.state}
        onChangeText={(text) => handleInputChange("state", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={newAddress.country}
        onChangeText={(text) => handleInputChange("country", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Postal Code"
        value={newAddress.postalCode}
        onChangeText={(text) => handleInputChange("postalCode", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={newAddress.phone}
        onChangeText={(text) => handleInputChange("phone", text)}
      />

      <Button title="Add Address" onPress={addAddress} />

      {addresses.map((item, index) => (
        <View key={index.toString()} style={styles.addressContainer}>
          <Text>{item.name}</Text>
          <Text>
            {item.street}, {item.city}, {item.state}, {item.country},{" "}
            {item.postalCode}
          </Text>
          <View style={styles.iconContainer}>
            {renderIcon(item.addressType)}
            <Text>{item.addressType}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AdressDetails", { address: item })
            }
          >
            <Text style={styles.link}>View Details</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  addressTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  iconContainer: {
    alignItems: "center",
  },
  addressContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  link: {
    color: "blue",
  },
});
