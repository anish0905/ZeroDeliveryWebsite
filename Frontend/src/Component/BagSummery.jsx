import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BagSummary = ({ name }) => {
  const bagItems = useSelector((state) => state.bag);
  const categories = {
    smartPhones: useSelector((state) => state.smartPhone),
  };

  let totalItem = 0;
  let totalMRP = 0;
  let totalDiscount = 0;
  let finalPayment = 0;

  bagItems.forEach((bagItemId) => {
    Object.values(categories).forEach((category) => {
      const item = category.find((item) => item._id === bagItemId);
      if (item) {
        totalItem++;
        totalMRP += item.price;
        totalDiscount += (item.price * item.discountPercentage) / 100;
        finalPayment +=
          item.price - (item.price * item.discountPercentage) / 100;
      }
    });
  });

  const formattedTotalDiscount = totalDiscount.toFixed(2);
  const formattedfinalPayment = finalPayment.toFixed(2);

  return (
    <div className="border-2 border-solid p-10 rounded">
      <div className="font-semibold my-4 text-gray-700">
        PRICE DETAILS ({totalItem} Items)
      </div>
      <div className="flex justify-between content-center items-center my-2">
        <span>Total MRP</span>
        <span>₹{totalMRP}</span>
      </div>
      <div className="flex justify-between content-center items-center my-2">
        <span>Discount on MRP</span>
        <span>-₹{formattedTotalDiscount}</span>
      </div>
      <div className="flex justify-between content-center items-center my-2">
        <span>Convenience Fee</span>
        <span>₹99</span>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between content-center items-center my-2 font-semibold">
        <span>Total Amount</span>
        <span>₹{formattedfinalPayment}</span>
      </div>
     
      {!name && (
         <Link to="/payment">
         <button className="w-full rounded bg-pink-600 text-white px-4 py-2 my-2">
           PLACE ORDER
         </button>
       </Link>
      )}
    </div>
  );
};

export default BagSummary;
