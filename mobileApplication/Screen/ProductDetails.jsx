import { StyleSheet, Text, View, Image, FlatList, Button, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for star icons
const { width } = Dimensions.get('window');
import axios from "axios";
import { API_URL } from "../conatant"; // Get the device's width
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShowCatogryWiseComp from '../component/ShowCatogryWiseComp';

export default function ProductDetails() {
  const route = useRoute();
  const { item } = route.params;
  const [selectedImage, setSelectedImage] = useState(item.images[0]);
  const [showMore, setShowMore] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  

  const renderImage = ({ item: image }) => (
    <TouchableOpacity onPress={() => setSelectedImage(image)}>
      <Image source={{ uri: image }} style={styles.thumbnailImage} />
    </TouchableOpacity>
  );

  // Render star rating based on the rating value
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i <= rating ? 'star' : 'star-o'}
          size={18}
          color="#FFD700"
        />
      );
    }
    return stars;
  };

  const addToCart = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId"); 
  
      if (userId) {
        await axios.post(`${API_URL}/api/cart`, {
          userId:userId, // Correctly pass the userId
          VendorUser: item.VendorUser,
          productId: item._id,
          productName: item.title,
          price: item.price,
          quantity: quantity,
          discountPercentage: item.discountPercentage,
          promotionCode: item.promotionCode || "null",
          Image: item.images[0]
        });
        Alert.alert(`${item.title} item added to cart successfully`);
      } else {
        Alert.alert("Error", "User ID not found. Please log in.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      Alert.alert("Error adding to cart", error.message);
    }
  };
  

  const category = item.category;
  const categoryName = category.toLowerCase()

  useEffect(() => {
    fetchProductcatogry();
  }, [categoryName]);

  const fetchProductcatogry = async () => {
    try {
      const resp = await axios.get(
        `${API_URL}/api/prod/category/${categoryName}`
      );
      setProducts(resp.data.data);
      // console.log(resp.data.data);
    } catch (error) {
      console.log("Error fetching products acc to category wise:", error);
      
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Selected Image Display */}
      <Image source={{ uri: selectedImage }} style={styles.mainImage} />

      {/* Image Thumbnails */}
      <FlatList
        data={item.images}
        renderItem={renderImage}
        keyExtractor={(image, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.thumbnailContainer}
      />

      {/* Product Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.discountedPrice}>₹ {item.price}</Text>
          <Text style={styles.originalPrice}>
            ₹ {(
              item.price +
              item.price * (item.discountPercentage / 100)
            ).toFixed(2)}{" "}
          </Text>
          <Text style={styles.discountPercentage}>
            ({item.discountPercentage}% OFF)
          </Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>

      {/* Show More Details Button */}
      <TouchableOpacity
        style={styles.showMoreButton}
        onPress={() => setShowMore(!showMore)}
      >
        <Text style={styles.showMoreButtonText}>
          {showMore ? "Show Less" : "Show More Details"}
        </Text>
      </TouchableOpacity>

      {/* Additional Information */}
      {showMore && (
        <View style={styles.additionalInfo}>
          {/* Extra product details */}
          <Text style={styles.subTitle}>Additional Information:</Text>
          <Text style={styles.additionalText}>Stock: {item.stock}</Text>
          <Text style={styles.additionalText}>Weight: {item.weight} kg</Text>
          <Text style={styles.additionalText}>
            Dimensions: {item.dimensions.width} x {item.dimensions.height} x {item.dimensions.depth} cm
          </Text>
          <Text style={styles.additionalText}>Warranty: {item.warrantyInformation}</Text>
          <Text style={styles.additionalText}>Shipping: {item.shippingInformation}</Text>
          <Text style={styles.additionalText}>Availability: {item.availabilityStatus}</Text>
          <Text style={styles.additionalText}>Return Policy: {item.returnPolicy}</Text>

          {/* Reviews Section */}
          <Text style={styles.subTitle}>Reviews:</Text>
          <ScrollView  
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.reviewScrollView}
          >
            {item.reviews.map((review) => (
              <View key={review.id} style={styles.reviewContainer}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewerName}> {review.reviewerName}</Text>
                  
                </View>
                <Text style={styles.reviewText}>{review.comment}</Text>
                <View style={styles.starsContainer}>{renderStars(review.rating)}</View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={addToCart}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buyButton, { backgroundColor: '#E4723C' }]}
          onPress={() => console.log(`Buying ${item.title}`)}
        >
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
      <ShowCatogryWiseComp products={products} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  mainImage: {
    width: width * 0.9, // 90% of the screen width
    height: width * 0.9, // Maintain aspect ratio (1:1)
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  thumbnailContainer: {
    marginBottom: 20,
  },
  thumbnailImage: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 5,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  infoContainer: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  discountedPrice: {
    fontSize: 24,
    color: '#E4723C',
    fontWeight: 'bold',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 20,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  discountPercentage: {
    fontSize: 18,
    color: '#E4723C',
    marginLeft: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'justify',
  },
  showMoreButton: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  showMoreButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 0,
  },
  cartButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  buyButton: {
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  additionalInfo: {
    marginTop: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },

  additionalText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'justify',
  },
  reviewScrollView: {
    marginVertical: 10,
  },
  reviewContainer: {
    backgroundColor: '#f1f1f1',
    padding: 20,
    borderRadius: 5,
    marginRight: 10, // Space between each review
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    flexShrink: 1,
    textAlign: 'center',
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#333',
  },
  starsContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginHorizontal: 5,
    marginVertical:10,
   
     
  },
});
