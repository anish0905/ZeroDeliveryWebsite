import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../Screen/HomeScreen";
import ProfileScreen from "../Screen/ProfileScreen";
import CartScreen from "../Screen/CartScreen";
import MyOrder from "../Screen/OrdersScreen";

import Login from "../Screen/Login";
import OTP from "../Screen/OTP";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ route }) => ({
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route }) => ({
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        })}
      />
      <Tab.Screen
        name="MyOrder"
        component={MyOrder}
        options={({ route }) => ({
          tabBarLabel: "MyOrder",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "addchart" : "assignment-add"}
              size={size}
              color={color}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={({ route }) => ({
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "shopping-cart" : "shopping-cart"}
              size={size}
              color={color}
            />
          ),
        })}
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
          name="HomeTabs"
          component={BottomTabs}
          options={{ headerShown: false }} // This hides the header for HomeTabs
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
