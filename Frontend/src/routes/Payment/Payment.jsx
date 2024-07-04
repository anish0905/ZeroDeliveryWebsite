import React, { useState } from 'react';
import { IoCheckmarkDone } from 'react-icons/io5';
import Swal from 'sweetalert2';

const Payment = () => {
  const [paymentOption, setPaymentOption] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(true);

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
      alert('Login successful!');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const handlePaymentSubmit = () => {
    if (!paymentOption) {
      alert('Please select a payment option.');
      return;
    }

    if (paymentOption === 'cashOnDelivery') {
      // Show success message using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Cash on Delivery selected. Generating success SMS.',
        timer: 10000, // Auto close after 3 seconds
        timerProgressBar: true,
        showConfirmButton: false
      });
    } else if (paymentOption === 'upi') {
      // Redirect logic for UPI payment
      window.location.href = 'https://www.google.com'; // Replace with actual UPI payment link
    } else if (paymentOption === 'netBanking') {
      // Redirect logic for Net Banking
      window.location.href = 'https://www.bankwebsite.com'; // Replace with actual Net Banking link
    } else {
      // Handle other payment options
      alert('Redirecting to payment gateway for Credit/Debit Card.');
    }
  };

  return (
    <div className="bg-gray-50 shadow-md w-full flex gap-4 content-center p-4 mt-2 mb-4">
      <span className="bg-blue-gray-200 py-1 px-2 h-7 text-sm rounded-sm text-blue-600">
        3
      </span>
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
                className="border rounded-md p-2"
              />
            </div>
            <div className="my-2">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="border rounded-md p-2"
              />
            </div>
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2 rounded-md"
            >
              Login
            </button>
          </div>
        ) : (
          <div>
            <h1 className="font-semibold text-gray-600 text-base">PAYMENT</h1>
            <div className="flex flex-col">
              <div className="my-2">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  name="paymentOption"
                  value="cashOnDelivery"
                  checked={paymentOption === 'cashOnDelivery'}
                  onChange={handlePaymentOptionChange}
                  className="mr-2"
                />
                <label htmlFor="cashOnDelivery" className="text-gray-700">
                  Cash on Delivery
                </label>
                {/* Icon for Cash on Delivery */}
                <IoCheckmarkDone className="ml-2 text-green-500" />
              </div>

              <div className="my-2">
                <input
                  type="radio"
                  id="upi"
                  name="paymentOption"
                  value="upi"
                  checked={paymentOption === 'upi'}
                  onChange={handlePaymentOptionChange}
                  className="mr-2"
                />
                <label htmlFor="upi" className="text-gray-700">
                  UPI
                </label>
                {/* Icon for UPI */}
                <IoCheckmarkDone className="ml-2 text-green-500" />
              </div>

              <div className="my-2">
                <input
                  type="radio"
                  id="netBanking"
                  name="paymentOption"
                  value="netBanking"
                  checked={paymentOption === 'netBanking'}
                  onChange={handlePaymentOptionChange}
                  className="mr-2"
                />
                <label htmlFor="netBanking" className="text-gray-700">
                  Net Banking
                </label>
                {/* Icon for Net Banking */}
                <IoCheckmarkDone className="ml-2 text-green-500" />
              </div>

              <div className="my-2">
                <input
                  type="radio"
                  id="creditCard"
                  name="paymentOption"
                  value="creditCard"
                  checked={paymentOption === 'creditCard'}
                  onChange={handlePaymentOptionChange}
                  className="mr-2"
                />
                <label htmlFor="creditCard" className="text-gray-700">
                  Credit Card
                </label>
                {/* Icon for Credit Card */}
                <IoCheckmarkDone className="ml-2 text-green-500" />
              </div>

              <div className="my-2">
                <input
                  type="radio"
                  id="debitCard"
                  name="paymentOption"
                  value="debitCard"
                  checked={paymentOption === 'debitCard'}
                  onChange={handlePaymentOptionChange}
                  className="mr-2"
                />
                <label htmlFor="debitCard" className="text-gray-700">
                  Debit Card
                </label>
                {/* Icon for Debit Card */}
                <IoCheckmarkDone className="ml-2 text-green-500" />
              </div>
            </div>

            {/* Button to submit payment */}
            <button
              onClick={handlePaymentSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-4 rounded-md"
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
