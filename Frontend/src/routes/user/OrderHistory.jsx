import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URI } from '../../Contants';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const userId = localStorage.getItem('userId'); // Fetch userId from local storage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URI}/api/products/getHistory/${userId}`);
        const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (userId) { // Ensure userId exists before making the request
      fetchData();
    }
  }, [userId]); // Fetch data whenever userId changes

  const calculateExpectedDate = (createdAt, shippingInfo) => {
    const createdDate = new Date(createdAt);
    let expectedDate = new Date(createdDate);

    // Assuming shippingInfo format is like "Ships in 1-2 business days"
    const match = shippingInfo.match(/\d+/g);
    if (match) {
      const minDays = parseInt(match[0], 10);
      const maxDays = parseInt(match[1], 10) || minDays;

      // Calculate expected delivery date
      expectedDate.setDate(createdDate.getDate() + minDays);
      return expectedDate.toDateString(); // Format expected date as needed
    }

    return "N/A"; // If shippingInfo doesn't match expected format
  };

  const filteredOrders = orders?.filter(order =>
    order?.products[0]?.productId.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search your orders here"
        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-y-auto max-h-[500px]">
        {filteredOrders.map(order => (
          <Link to={`/orderDetails/${order._id}`}
            key={order._id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 mb-4 border rounded-md shadow-sm hover:bg-gray-50 transition"
          >
            <div className="flex items-start sm:items-center mb-4 sm:mb-0">
              <img
                src={order.products[0].productId.thumbnail} // Assuming thumbnail is available
                alt={order.products[0].productId.title}
                className="w-16 h-16 sm:w-20 sm:h-20 mr-4 rounded-md object-cover"
              />
              <div className="text-sm sm:text-base">
                <h2 className="font-semibold">{order.products[0].productId.title}</h2>
                <p className="text-gray-600">Price: ${order.products[0].price}</p>
                <p className="text-gray-500">Shipping: {order.products[0].productId.shippingInformation}</p>
              </div>
            </div>
            <div className="text-right text-sm sm:text-base">
              <p className={order.status === 'pending' ? 'text-red-500 font-semibold' : 'text-green-500 font-semibold'}>
                {order.status}
              </p>
              <p className="mt-2 text-blue-500">
                Payment {order.paymentStatus === 'unpaid' ? 'Not Successful' : 'Successful'}.
              </p>
              <p className="mt-2 text-gray-600">
                Expected Delivery: {calculateExpectedDate(order.createdAt, order.products[0].productId.shippingInformation)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
