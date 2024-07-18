import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoCheckmarkDone } from 'react-icons/io5';
import Swal from 'sweetalert2';
import { API_URI } from '../../Contants';

const Payment = () => {
  const [paymentOption, setPaymentOption] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(true);
  const [bagItems, setBagItems] = useState([]);

  const address = localStorage.getItem('selectedAddress') ? JSON.parse(localStorage.getItem('selectedAddress')) : {};
  const userId = localStorage.getItem('userId');

  const fetchCart = async () => {
    try {
      const resp = await axios.get(`${API_URI}/api/cart/${userId}`);
      setBagItems(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handlePaymentOptionChange = (event) => {
    setPaymentOption(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Simplified mock authentication logic
    if (username === 'user' && password === 'password') {
      setAuthenticated(true);
      Swal.fire({
        icon: 'success',
        title: 'Login successful!',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid credentials',
        text: 'Please try again.',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const handlePaymentSubmit = async () => {
    if (!paymentOption) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Please select a payment option.',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      });
      return;
    }

    const products = bagItems.map(item => ({
      productId:item.productId,
      quantity: item.quantity,
      price: item.price
    }));

    const orderData = {
      userId,
      address: address._id,
      products,
      paymentMethod: paymentOption,
      paymentStatus: 'unpaid',
      status: 'pending'
    };

    try {
      const resp = await axios.put(`${API_URI}/api/products/orderProduct`, orderData);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Cash on Delivery selected. Generating success SMS.',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    }
  };

  return (
    <div className="bg-gray-50 shadow-md w-full flex gap-4 content-center p-4 mt-2 mb-4">
      <span className="bg-blue-gray-200 py-1 px-2 h-7 text-sm rounded-sm text-blue-600">3</span>
      <div className="w-full items-center content-center">
        {!authenticated ? (
          <div>
            <h1 className="font-semibold text-gray-600 text-base">LOGIN</h1>
            <div className="my-2">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div className="my-2">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2 rounded-md w-full"
            >
              Login
            </button>
          </div>
        ) : (
          <div>
            <h1 className="font-semibold text-gray-600 text-base">PAYMENT</h1>
            <div className="flex flex-col">
              <div className="my-2 flex items-center">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  name="paymentOption"
                  value="cashOnDelivery"
                  checked={paymentOption === 'cashOnDelivery'}
                  onChange={handlePaymentOptionChange}
                  className="mr-2"
                />
                <label htmlFor="cashOnDelivery" className="text-gray-700">Cash on Delivery</label>
                <IoCheckmarkDone className={`ml-2 ${paymentOption === 'cashOnDelivery' ? 'text-green-500' : 'hidden'}`} />
              </div>

              <div className="my-2 flex items-center">
                <input
                  type="radio"
                  id="upi"
                  name="paymentOption"
                  value="upi"
                  checked={paymentOption === 'upi'}
                  onChange={handlePaymentOptionChange}
                  className="mr-2"
                />
                <label htmlFor="upi" className="text-gray-700">UPI</label>
                <IoCheckmarkDone className={`ml-2 ${paymentOption === 'upi' ? 'text-green-500' : 'hidden'}`} />
              </div>

              <div className="my-2 flex items-center">
                <input
                  type="radio"
                  id="netBanking"
                  name="paymentOption"
                  value="netBanking"
                  checked={paymentOption === 'netBanking'}
                  onChange={handlePaymentOptionChange}
                  className="mr-2"
                />
                <label htmlFor="netBanking" className="text-gray-700">Net Banking</label>
                <IoCheckmarkDone className={`ml-2 ${paymentOption === 'netBanking' ? 'text-green-500' : 'hidden'}`} />
              </div>

              <div className="my-2 flex items-center">
                <input
                  type="radio"
                  id="creditCard"
                  name="paymentOption"
                  value="creditCard"
                  checked={paymentOption === 'creditCard'}
                  onChange={handlePaymentOptionChange}
                  className="mr-2"
                />
                <label htmlFor="creditCard" className="text-gray-700">Credit Card</label>
                <IoCheckmarkDone className={`ml-2 ${paymentOption === 'creditCard' ? 'text-green-500' : 'hidden'}`} />
              </div>

              <div className="my-2 flex items-center">
                <input
                  type="radio"
                  id="debitCard"
                  name="paymentOption"
                  value="debitCard"
                  checked={paymentOption === 'debitCard'}
                  onChange={handlePaymentOptionChange}
                  className="mr-2"
                />
                <label htmlFor="debitCard" className="text-gray-700">Debit Card</label>
                <IoCheckmarkDone className={`ml-2 ${paymentOption === 'debitCard' ? 'text-green-500' : 'hidden'}`} />
              </div>
            </div>

            <button
              onClick={handlePaymentSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-4 rounded-md w-full"
            >
              Proceed to Pay
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
