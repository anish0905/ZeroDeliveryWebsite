import React from 'react';
import BagSummery from './BagSummery';
import BagItems from './BagItems';
import { useSelector } from 'react-redux';

const Bag = () => {
  const bagState = useSelector((state) => state.bag) || { data: [] };
  const bagItems = bagState.data.flat(); // Flatten the nested data array
  const categories = {
    smartPhones: useSelector((state) => state.smartPhone), // Example, adjust this as per your actual state structure
  };

  const finalItems = bagItems.map((bagItem) => {
    for (const category of Object.values(categories)) {
      const item = category.find((item) => item._id === bagItem.productId);
      if (item) {
        return { ...item, quantity: bagItem.quantity }; // Include the quantity from the bagItem
      }
    }
    return null;
  }).filter(Boolean);

  return (
    <div className='lg:flex pt-32 p-10 gap-5 md:block block'>
      <div className='lg:w-1/2 w-full'>
        {finalItems.map((item, index) => (
          <div key={index} className='w-full my-4'>
            <BagItems item={item} />
          </div>
        ))}
      </div>
      <div className='lg:w-5/12 w-full my-4 lg:fixed right-10'>
        <BagSummery />
      </div>
    </div>
  );
};

export default Bag;
