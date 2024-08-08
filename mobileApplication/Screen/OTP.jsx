import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image, // Make sure to import Image
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../conatant";
import loginIMg from "../assets/login.png"; // Ensure the path is correct
import AsyncStorage from "@react-native-async-storage/async-storage";

const OTP = () => {
  const [otp, setOtp] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { mobile } = route.params;

  const handleVerifyOTP = async () => {
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP.");
      return;
    }

    console.log("Verifying", otp, mobile);

    try {
      const response = await axios.post(`${API_URL}/user/vefifyOpt`, {
        mobileNumber: mobile,
        otp,
      });
      console.log(response.data);

      await AsyncStorage.setItem("token", response.data.token);
      Alert.alert("Success", "Logged in successfully.");
      navigation.replace("Main");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Invalid OTP.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
       <Image source={loginIMg} style={styles.logo} />
      <Text style={styles.text}>Enter OTP</Text>
      <View style={styles.mainContainer}>
        <View style={styles.inputFieldContainer}>
         
          <TextInput
            style={styles.inputField}
            placeholder="OTP"
            keyboardType="numeric"
            value={otp}
            onChangeText={setOtp}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 50,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  mainContainer: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 40,
  },
  inputFieldContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
    color: "#333333",
  },
  button: {
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333333",
    paddingVertical: 10,
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
});
