import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../conatant";
import loginIMg from "../assets/login.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [inputType, setInputType] = useState("mobile"); // State to determine login type
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem("userId");
        if (token && userId) {
          navigation.replace('Main');
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserLogin();
  }, []);

  const handleLogin = async () => {
    if ((inputType === "mobile" && !mobile) || (inputType === "email" && !email) || !password) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
    try {
      const payload = inputType === "mobile" ? { mobileNumber: mobile } : { email: email };
      const response = await axios.post(`${API_URL}/user/request-otp`, payload);
  
      if (response.status === 200 || response.status === 201) {
        navigation.navigate('OTP', { [inputType]: mobile || email });
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Invalid mobile number or email.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={loginIMg} style={styles.logo} />
      <Text style={styles.text}>Login to your Account</Text>
      <View style={styles.mainContainer}>
        <View style={styles.inputFieldContainer}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                inputType === "mobile" && styles.activeToggleButton,
              ]}
              onPress={() => setInputType("mobile")}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  inputType === "mobile" && styles.activeToggleButtonText,
                ]}
              >
                Mobile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                inputType === "email" && styles.activeToggleButton,
              ]}
              onPress={() => setInputType("email")}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  inputType === "email" && styles.activeToggleButtonText,
                ]}
              >
                Email
              </Text>
            </TouchableOpacity>
          </View>

          {inputType === "mobile" ? (
            <>
              <Text style={styles.label}>Mobile</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={mobile}
                onChangeText={setMobile}
              />
            </>
          ) : (
            <>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </>
          )}

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
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
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#cccccc",
    alignItems: "center",
  },
  activeToggleButton: {
    backgroundColor: "#333333",
  },
  toggleButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  activeToggleButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
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
