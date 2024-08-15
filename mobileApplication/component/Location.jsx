import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Octicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

export default function LocationComponent() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

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

  const handleOnpress = (event, newAddress) => {
    event.persist(); // Prevents React from pooling the event
    navigation.navigate("Adress", { newAddress: newAddress });
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="location-on" size={24} color="black" />
      </View>
      <View style={styles.info}>
        <Text style={styles.text}>
          Deliver to{" "}
          {address ? `${address.street}, ${address.city}` : "Fetching address..."}
        </Text>
      </View>
      <TouchableOpacity onPress={(event) => handleOnpress(event, address)} style={styles.iconContainer}>
        <Octicons name="chevron-down" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#BFE4F0",
    justifyContent: "flex-start",
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
