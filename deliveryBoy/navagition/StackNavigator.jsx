import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../Screen/HomeScreen";
import ProfileScreen from "../Screen/ProfileScreen";
import MyOrder from "../Screen/OrdersScreen";
import Login from "../Screen/Login";
import OTP from "../Screen/OTP";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";

import OrderDetails from "../component/myOrder/OrderDetails";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      
     
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function MyOrderStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Order"
        component={MyOrder}
        options={{
          headerStyle: {
            backgroundColor: "#96D6EF",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "left",
        }}
      
      />
      <Stack.Screen
        name="Order Details"
        component={OrderDetails}
        options={{
          headerStyle: {
            backgroundColor: "#96D6EF",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "left",
        }}
      
      />

      
    </Stack.Navigator>
  );
}



function BottomTabs() {
  const cartItems = useSelector((store) => store.bag) || { totalQuantity: 0 };

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      
      <Tab.Screen
       name="MyOrderTab"
       component={MyOrderStack}
        options={{
          tabBarLabel: `My Order`,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ width: 24, height: 24 }}>
              <MaterialIcons
              name={focused ? "addchart" : "assignment-add"}
              size={size}
              color={color}
            />
              {cartItems.totalQuantity > 0 && ( // Only show the badge if there are items in the cart
                <View
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -10,
                    backgroundColor: "red",
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    {cartItems.totalQuantity}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTP"
          component={OTP}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
