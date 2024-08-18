import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from '@react-navigation/native'
import { API_URL } from '../conatant'

export default function ShowCatogryWiseComp({products}) {
  return (
    <View >
        {products.length > 0 ? (
          <FlatList
            contentContainerStyle={{ paddingTop: 100 }}
            data={products}
            keyExtractor={(item) => item._id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => (
              <View style={styles.productItem}>
                <Link
                  to={{ screen: "Product", params: { item: item } }}
                  style={styles.imgContainer}
                >
                  <Image
                    source={{ uri: `${API_URL}/${item.thumbnail}` }}
                    style={styles.productImage}
                    // Logs any image loading errors
                  />
                </Link>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>₹ {item.price}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noProductsText}>
            No products found in this category.
          </Text>
        )}
      </View>
  )
}

const styles = StyleSheet.create({

    row: {
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginBottom: 10,
         // Add some padding to the row
      },
      productItem: {
        flex: 1,
        margin: 5,
        padding: 15,
        borderRadius: 15, // Rounded corners for the product item
        backgroundColor: "#C2E5EE",
        justifyContent: "center", // White background for product cards
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
       
    
      },
      imgContainer: {
        width: "100%",
        height: 150,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        
      },
      productImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
        borderRadius: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center", // Rounded corners for images
      },
      productTitle: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "#402E7A", // Darker text color for better contrast
        marginBottom: 5,
      },
      productPrice: {
        fontSize: 14,
        color: "#4C3BCF",
      },
      noProductsText: {
        marginTop: 100,
        textAlign: "center",
        fontSize: 18,
        color: "#888",
      },

})