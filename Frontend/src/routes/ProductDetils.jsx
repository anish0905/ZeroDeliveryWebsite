import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/BagSlice";
import { Link } from "react-router-dom";
import axios from 'axios';
import { API_URI } from '../Contants';

const ProductDetails = ({ item }) => {
  const [selectedImage, setSelectedImage] = useState(item.images[0]);
  const [showReviews, setShowReviews] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const bagItem = useSelector((store) => store.bag);
  const elementFound = bagItem.includes(item._id);
  const userId = localStorage.getItem('userId');

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value);
  };

  const handleAddToBag = async() => {
    try {
      const resp = await axios.post(`${API_URI}/api/cart`, {
          userId,
          productId: item._id,
          productName: item.title,
          price: item.price,
          quantity: quantity,
          promotionCode: item.promotionCode || "null",
      });
      dispatch(bagActions.addToBag(resp.data));
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      
    }
  };

  const handleRemove = () => {
    dispatch(bagActions.removeFromBag(item._id));
  };

  return (
    <div className="container mx-auto px-4 pt-10">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="relative">
            <img
              src={selectedImage}
              alt={item.title}
              loading="lazy"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="mt-4 flex space-x-2 overflow-x-auto">
            {item.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={item.title}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${selectedImage === image ? "border-2 border-blue-500" : ""}`}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
          <p className="text-gray-700 mb-4">{item.description}</p>
          <div className="flex gap-5 my-2  px-1">
            <span className="text-xl">RS {item.price}</span>
            <span className="text-gray-400 text-sm font-thin line-through">
              RS {(item.price + item.price * (item.discountPercentage / 100)).toFixed(2)}{" "}
            </span>
            <span className="text-pink-400 text-sm font-thin">
              ({item.discountPercentage}% OFF)
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-bold">Stock:</span> {item.stock}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-bold">Brand:</span> {item.brand}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-bold">Warranty:</span> {item.warrantyInformation}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-bold">Shipping:</span> {item.shippingInformation}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-bold">Availability:</span> {item.availabilityStatus}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-bold">Return Policy:</span> {item.returnPolicy}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-bold">Weight:</span> {item.weight} kg
          </p>
          <div className="text-sm text-gray-600 mb-4">
            <span className="font-bold">Dimensions:</span> {item.dimensions.width} x {item.dimensions.height} x{" "}
            {item.dimensions.depth} cm
          </div>

          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-2">Quantity:</label>
            <div className="relative">
              <select
                id="quantity"
                className="border rounded-lg px-3 py-2 appearance-none bg-white border-gray-300 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={quantity}
                onChange={handleQuantityChange}
              >
                {[...Array(item.stock).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {elementFound ? (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4 mr-4"
              onClick={handleRemove}
            >
              Remove from Bag
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 mr-4"
              onClick={handleAddToBag}
            >
              Add to Bag
            </button>
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
            onClick={toggleReviews}
          >
            {showReviews ? "Hide Reviews" : "Show Reviews"}
          </button>

          {showReviews && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Reviews</h2>
              <div className="space-y-4">
                {item.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
                  >
                    <p className="font-semibold mb-1">{review.reviewerName}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      {review.comment}
                    </p>
                    <div className="flex items-center">
                      <p className="text-sm text-yellow-500 mr-2">Rating:</p>
                      <div className="flex">
                        {Array(review.rating)
                          .fill()
                          .map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 fill-current text-yellow-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.924c.96 0 1.36 1.23.588 1.81l-3.985 2.897a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.985 2.897c-.784.57-1.84-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L1.644 10.1c-.772-.58-.372-1.81.588-1.81h4.924a1 1 0 00.95-.69l1.518-4.674z" />
                            </svg>
                          ))}
                      </div>
                      <p className="text-sm text-gray-600 ml-2">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
