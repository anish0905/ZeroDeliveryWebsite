import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../conatant';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from '@react-navigation/native';

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const resp = await axios.get(`${API_URL}/api/prod/category`);
      setCategories(resp.data.data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        {categories.map((category) => {
          const product = category.products[0]; // Get the first product in the category
          const imageUrl = product
            ? product.thumbnail || (product.images && product.images.length > 0 ? product.images[0] : 'defaultImage.png')
            : 'defaultImage.png';

          return (
            <View key={category._id} style={styles.categoryContainer}>
              <Link
                to={{ screen: 'Category', params: { categoryName: category._id } }}
                style={styles.imageContainer}
              >
               <View style={styles.SubimageContainer}>
               <Image
                  source={{ uri: imageUrl }}
                  style={styles.image}
                  resizeMode="cover"
                />
               </View>
              </Link>
              <Text style={styles.categoryText}>{category._id}</Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    alignItems: 'center',
    paddingLeft: 10,
  },
  categoryContainer: {
    marginRight: 20,
    alignItems: 'center',
    

  },
  imageContainer: {
    width: 70,
    height: 70,
       

  },
  SubimageContainer: {
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 50,
    overflow: 'hidden',
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#ddd',
    padding: 5,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 50,
    overflow: 'hidden',
   
  },
  categoryText: {
    marginTop: 5,
    fontSize: 10,
  },
});
