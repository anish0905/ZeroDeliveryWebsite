import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const userId = localStorage.getItem('userId'); // Fetch userId from local storage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/products/getHistory/${userId}`);
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
      // For simplicity, here we're assuming the maxDays for a broader range
      // You can use maxDays in your logic as per requirement

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
        className="w-full p-2 mb-4 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-y-auto max-h-96">
        {filteredOrders.map(order => (
          <Link to={`/orderDetails/${order._id}`}
            key={order._id}
            className="flex items-center justify-between p-4 mb-4 border rounded shadow-sm"
          >
            <div className="flex items-center">
              <img
                src={order.products[0].productId.thumbnail} // Assuming thumbnail is available
                alt={order.products[0].productId.title}
                className="w-20 h-20 mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{order.products[0].productId.title}</h2>
                <p className="text-gray-600">{order.products[0].price}</p>
                <p className="text-gray-500">{order.products[0].productId.shippingInformation}</p>
              </div>
            </div>
            <div>
              <p className={order.status === 'pending' ? 'text-red-500' : 'text-green-500'}>
                {order.status}
              </p>
              <p className="mt-2 text-sm text-blue-500">
                Payment {order.paymentStatus === 'unpaid' ? 'not successful' : 'successful'}.
              </p>
              <p className="mt-2 text-sm text-gray-600">
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
