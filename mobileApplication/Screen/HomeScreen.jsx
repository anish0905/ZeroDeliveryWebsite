import { StyleSheet,
  SafeAreaView,
  ScrollView,
 
  TextInput,
  View,
 } from 'react-native'
import React from 'react'
import AntDesign from "@expo/vector-icons/AntDesign";

import Location from "../component/Location";
import Catogry from '../component/Catogry';

export default function HomeScreen() {
  return (
    <SafeAreaView
     
    >
      <ScrollView>
        <View style={styles.searcherBar}>
          <AntDesign name="search1" size={22} color="black" style={styles.icon} />

          <TextInput
            style={styles.searchInput}
            placeholder="Search Product..."
            placeholderTextColor="#888"
          />
         
          
        </View>
        <Location/>
        <Catogry/>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  searcherBar: {
    paddingTop:40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#96D6EF",
    padding: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    position: "relative",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 35,
    height: 40,
    color: "black",
    fontWeight: "bold",
    marginHorizontal: 10,
    
  },
  icon: {
    position: "absolute",
    left: 28,
    top: 48,
    zIndex: 1,
  },
});
