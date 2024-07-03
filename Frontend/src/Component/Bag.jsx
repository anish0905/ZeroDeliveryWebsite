import React from 'react';
import BagSummery from './BagSummery';
import BagItems from './BagItems';
import { useSelector } from 'react-redux';

const Bag = () => {
  const bagItems = useSelector((state) => state.bag);
  const categories = {
    smartPhones: useSelector((state) => state.smartPhone),
    
  
  };



  const finalItems = bagItems.map((bagItemId) => {
    for (const category of Object.values(categories)) {
      const item = category.find((item) => item.id === bagItemId);
      if (item) {
        return item;
      }
    }
    return null;
  }).filter(Boolean);


  return (
    <div className='lg:flex pt-32 p-10 gap-5 md:block block'>
      <div className='lg:w-1/2 w-full'>
        {finalItems.map((item, index) => (
          <div key={index} className=' w-full my-4'>
            <BagItems item={item} />
          </div>
        ))}
      </div>
      
        <div className='lg:w-1/2 w-full my-4'>
          <BagSummery />
        </div>
     
    </div>
  );
};

export default Bag;
