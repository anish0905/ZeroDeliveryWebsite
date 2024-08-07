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
  import { Link, useNavigation } from "@react-navigation/native";
  import axios from "axios";
  import { API_URL } from "../conatant";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  const Login = () => {
    const [mobile, setmobile] = useState("");
    const [password, setPassword] = useState("");
  
    const navigation = useNavigation();
  
    useEffect(() => {
      const checkUserLogin = async () => {
        try {
          const token = await AsyncStorage.getItem("token");
          if (token) {
            navigation.replace('HomeTabs');
          }
        } catch (error) {
          console.log(error);
        }
      };
      checkUserLogin();
    }, []);
  
    const handleLogin = async () => {
      // Perform validation checks
      if (!mobile || !password) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }
  
      try {
        const response = await axios.post(`${API_URL}/user/login`, { mobile, password });
        await AsyncStorage.setItem("token", response.data.accessToken);
  
        if (response.status === 200) {
          Alert.alert("Success", "Logged in successfully.");
          navigation.navigate('HomeTabs');
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Invalid mobile or password.");
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={{ uri: "https://i.insider.com/5ebaeedee3c3fb22cf13fd47" }}
          style={styles.logo}
        />
  
        <Text style={styles.text}>Login to your Account</Text>
        <View style={styles.mainContainer}>
          <View style={styles.inputFieldContainer}>
            <Text style={styles.label}>mobile</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Phone Number"
              keyboardType="mobile"
              value={mobile}
              onChangeText={setmobile}
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
      height: 150,
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
    forgotPasswordLink: {
      fontSize: 16,
      marginTop: 20,
      color: "#666666",
      textAlign: "center",
    },
    signUpLink: {
      fontSize: 16,
      marginTop: 20,
      color: "#666666",
      textAlign: "center",
    },
  });
  