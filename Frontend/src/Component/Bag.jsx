import React from 'react';
import BagSummery from './BagSummery';
import BagItems from './BagItems';
import { useSelector } from 'react-redux';

const Bag = () => {
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
