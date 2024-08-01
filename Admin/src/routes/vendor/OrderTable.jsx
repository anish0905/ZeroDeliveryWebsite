import React, { useState } from 'react';
import { DateTime } from 'luxon';

const OrderTable = ({ orders, updateOrderStatus }) => {
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [status, setStatus] = useState('pending');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleChangeStatusClick = (orderId) => {
        setSelectedOrderId(orderId);
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        setIsDropdownOpen(false);
        updateOrderStatus(selectedOrderId, newStatus);
    };

    if (orders.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>No orders found.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 ">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                            <th className="px-4 py-2 border">Order ID</th>
                            <th className="px-4 py-2 border">User ID</th>
                            <th className="px-4 py-2 border">Products</th>
                            <th className="px-4 py-2 border">Address</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Payment Method</th>
                            <th className="px-4 py-2 border">Payment Status</th>
                            <th className="px-4 py-2 border">Order Date</th>
                           
                            
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-100 transition-colors">
                                <td className="px-4 py-2 border text-center">
                                    <div className="flex flex-col items-center">
                                        {order.products.length > 0 && (
                                            <div className="relative group mb-2">
                                                <img
                                                    src={order.products[0].productId.thumbnail}
                                                    alt={order.products[0].productId.title}
                                                    className="w-16 h-16 object-cover rounded-full mb-2 transform group-hover:scale-105 transition-transform"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-white text-sm">{order.products[0].productId.title}</span>
                                                </div>
                                            </div>
                                        )}
                                        {order._id}
                                    </div>
                                </td>
                                <td className="px-4 py-2 border text-center">{order.userId}</td>
                                <td className="px-4 py-2 border">
                                    {order.products.map((product) => (
                                        <div key={product._id} className="mb-2 p-2  w-32 bg-gray-100 rounded-md">
                                            <p><strong>Title:</strong> {product.productId.title}</p>
                                            <p><strong>Quantity:</strong> {product.quantity}</p>
                                            <p><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
                                            <p><strong>Shipping Info:</strong> {product.productId.shippingInformation}</p>
                                        </div>
                                    ))}
                                </td>
                                <td className="px-4 py-2 border">
                                    <p>{order.address.street}</p>
                                    <p>{order.address.city}, {order.address.state}</p>
                                    <p>{order.address.country}, {order.address.postalCode}</p>
                                    <p><strong>Name:</strong> {order.address.name}</p>
                                    <p><strong>Phone:</strong> {order.address.phone}</p>
                                </td>
                                <td className="px-4 py-2 border text-center">{order.status}</td>
                                <td className="px-4 py-2 border text-center">{order.paymentMethod}</td>
                                <td className="px-4 py-2 border text-center">{order.paymentStatus}</td>
                                <td className="px-4 py-2 border text-center">
                                    {DateTime.fromISO(order.createdAt).toLocaleString(DateTime.DATETIME_MED)}
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderTable;
