import React from 'react';

const OrderTable = ({ orders, updateOrderStatus }) => {
    return (
        <div className="container mx-auto p-4 pt-24">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border">Order ID</th>
                            <th className="px-4 py-2 border">User ID</th>
                            <th className="px-4 py-2 border">Products</th>
                            <th className="px-4 py-2 border">Address</th>
                            <th className="px-4 py-2 border">Address</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Payment Method</th>
                            <th className="px-4 py-2 border">Payment Status</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td className="px-4 py-2 border">{order._id}</td>
                                <td className="px-4 py-2 border">{order.userId}</td>
                                <td className="px-4 py-2 border">
                                    {order.products.map((product) => (
                                        <div key={product._id} className="mb-2">
                                            <p><strong>Title:</strong> {product.productId.title}</p>
                                            <p><strong>Quantity:</strong> {product.quantity}</p>
                                            <p><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
                                            <img
                                                src={product.productId.thumbnail}
                                                alt={product.productId.title}
                                                className="w-20 h-20 object-cover mt-2"
                                            />
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
                                <td className="px-4 py-2 border">{order.status}</td>
                                <td className="px-4 py-2 border">{order.paymentMethod}</td>
                                <td className="px-4 py-2 border">{order.paymentStatus}</td>
                                <td className="px-4 py-2 border">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        onClick={() => updateOrderStatus(order._id)}
                                    >
                                        Change Status
                                    </button>
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
