import React from 'react';
import { useSelector } from 'react-redux';

const BagSummary = () => {
  const bagItems = useSelector((state) => state.bag);
  const categories = {
    smartPhones: useSelector((state) => state.smartPhone),
    fragrances: useSelector((state) => state.fragrances),
    skincare: useSelector((state) => state.skincare),
    groceries: useSelector((state) => state.groceries),
    homeDecorations: useSelector((state) => state.homeDecoration),
    tops: useSelector((state) => state.top),
    womenDresses: useSelector((state) => state.womensDresses),
    womenShoes: useSelector((state) => state.womenShoes),
    manShoes: useSelector((state) => state.manShoes),
    manShirts: useSelector((state) => state.manShirt),
    laptops: useSelector((state) => state.laptop),
    manWatchs: useSelector(store=>store.manWatch),
    womenWatchs: useSelector(store=>store.womenWatch),
  

  };

  let totalItem = 0;
  let totalMRP = 0;
  let totalDiscount = 0;
  let finalPayment = 0;

  bagItems.forEach((bagItemId) => {
    Object.values(categories).forEach((category) => {
      const item = category.find((item) => item.id === bagItemId);
      if (item) {
        totalItem++;
        totalMRP += item.price;
        totalDiscount += (item.price * item.discountPercentage) / 100;
        finalPayment += item.price - (item.price * item.discountPercentage) / 100;
      }
    });
  });

  const formattedTotalDiscount = totalDiscount.toFixed(2);
  const formattedfinalPayment = totalDiscount.toFixed(2);


  return (
    <div className="border-2 border-solid p-10 rounded">
      <div className='font-semibold my-4 text-gray-700'>
        Price DETAILS ({totalItem} Items)
      </div>
      <div className='flex justify-between content-center items-center my-2'>
        <span>Total MRP</span>
        <span>₹{totalMRP}</span>
      </div>
      <div className='flex justify-between content-center items-center my-2'>
        <span>Discount on MRP</span>
        <span>-₹{formattedTotalDiscount}</span> 
      </div>
      <div className='flex justify-between content-center items-center my-2'>
        <span>Convenience Fee</span>
        <span>₹99</span>
       </div>
       <hr className='my-2' />
       <div className='flex justify-between content-center items-center my-2 font-semibold'>
        <span>Total Amount</span>
        <span>₹{formattedfinalPayment}</span>
       </div>
       <div>
            <button className='w-full rounded bg-pink-600 text-white px-4 py-2 my-2'>
                PLACE ORDER
            </button>
        </div>
    </div>
  );
}

export default BagSummary;
