
import React, { useState } from 'react';
import OrderTable from './OrderTable';
import axios from 'axios';
import Sidebar from '../admin/Sidebar';

const OrderHomePage = () => {
    const [orders, setOrders] = useState([
        {
            "_id": "66994d252a60f1632f1db0c7",
            "userId": "668e4abd3f9828f14878ae00",
            "products": [
                {
                    "productId": {
                        "_id": "66855d0e16d6b76fe2581de4",
                        "title": "Ice Cream",
                        "description": "Creamy and delicious ice cream, available in various flavors for a delightful treat.",
                        "category": "groceries",
                        "price": 5.49,
                        "discountPercentage": 7.58,
                        "rating": 3.77,
                        "stock": 76,
                        "tags": ["desserts"],
                        "sku": "VEZMU1EQ",
                        "weight": 5,
                        "dimensions": {
                            "width": 17.66,
                            "height": 24.49,
                            "depth": 25.98,
                            "_id": "66855d0e16d6b76fe2581de5"
                        },
                        "warrantyInformation": "2 year warranty",
                        "shippingInformation": "Ships in 2 weeks",
                        "availabilityStatus": "In Stock",
                        "reviews": [
                            {
                                "rating": 5,
                                "comment": "Great product!",
                                "date": "2024-05-23T08:56:21.620Z",
                                "reviewerName": "Elena Baker",
                                "reviewerEmail": "elena.baker@x.dummyjson.com",
                                "_id": "66855d0e16d6b76fe2581de6"
                            },
                            {
                                "rating": 5,
                                "comment": "Highly impressed!",
                                "date": "2024-05-23T08:56:21.620Z",
                                "reviewerName": "Madeline Simpson",
                                "reviewerEmail": "madeline.simpson@x.dummyjson.com",
                                "_id": "66855d0e16d6b76fe2581de7"
                            },
                            {
                                "rating": 5,
                                "comment": "Very happy with my purchase!",
                                "date": "2024-05-23T08:56:21.620Z",
                                "reviewerName": "Caleb Nelson",
                                "reviewerEmail": "caleb.nelson@x.dummyjson.com",
                                "_id": "66855d0e16d6b76fe2581de8"
                            }
                        ],
                        "returnPolicy": "No return policy",
                        "minimumOrderQuantity": 19,
                        "meta": {
                            "createdAt": "2024-05-23T08:56:21.620Z",
                            "updatedAt": "2024-05-23T08:56:21.620Z",
                            "barcode": "9603960319256",
                            "qrCode": "https://cdn.dummyjson.com/public/qr-code.png",
                            "_id": "66855d0e16d6b76fe2581de9"
                        },
                        "images": [
                            "https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/1.png",
                            "https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/2.png",
                            "https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/3.png",
                            "https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/4.png"
                        ],
                        "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/thumbnail.png",
                        "__v": 0
                    },
                    "quantity": 3,
                    "price": 5.49,
                    "_id": "66994d252a60f1632f1db0c8"
                }
            ],
            "address": {
                "location": null,
                "street": "Bengaluru",
                "city": "Madhubani",
                "state": "bihar",
                "country": "India",
                "postalCode": "851134",
                "name": "ramu",
                "phone": "6352396301",
                "addressType": "Work",
                "_id": "668e4b363f9828f14878af01"
            },
            "status": "pending",
            "paymentMethod": "cashOnDelivery",
            "paymentStatus": "unpaid",
            "createdAt": "2024-07-18T17:13:09.084Z",
            "updatedAt": "2024-07-18T17:13:09.084Z",
            "__v": 0
        }
    ]);

    const updateOrderStatus = async (orderId) => {
        try {
            const response = await axios.put(`/api/orders/${orderId}/status`, {
                status: 'completed', // Example status update
            });
            if (response.status === 200) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, status: 'completed' } : order
                    )
                );
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div className='flex'>
            <div className="lg:block md:block hidden">
          <Sidebar />
        </div>
            <OrderTable orders={orders} updateOrderStatus={updateOrderStatus}  />
        </div>
    );
};

export default OrderHomePage;
