


import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SmartPhone from './SmartPhone';
import Banner from '../Component/Banner';
import ItemsCategory from '../routes/catgories/ItemsCategory';
import ItemCards from '../Component/ItemCards';

const Home = () => {

  const smartPhones = useSelector(store => store.smartPhone);

  // Function to get unique categories
  const getUniqueCategories = (smartPhones) => {
    const categories = smartPhones?.map(smartPhones =>smartPhones.category);
    return [...new Set(categories)];
  };

  // Get unique categories
  const categories = getUniqueCategories(smartPhones);

  // Function to filter products by category
  const filterProductsByCategory = (category) => {
    return smartPhones.filter(smartPhones =>smartPhones.category === category);
  };
  const transformCategoryName = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase()+ name.slice(1).toLowerCase();
  };
  

  return (
    <div className='flex flex-col'>
    <Banner />
    <ItemCards />
    <ItemsCategory />
    {categories.map(category => (
      <Category
        key={category}
        name={transformCategoryName(category)}
        items={filterProductsByCategory(category)}
        Component={SmartPhone}
      />
    ))}
  </div>
  );
};



const Category = ({ name, items, Component }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.firstChild.getBoundingClientRect().width;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -itemWidth * 3 : itemWidth * 3,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className='mb-2'>
      <div className='flex justify-between items-center px-10 mt-10'>
        <h1 className='text-xl font-bold'>{name}</h1>
        <Link to={`/showCategory/${name}`} className='text-green-700 text-xl'>see all</Link>
      </div>
      <div className='relative px-8'>
        <button
          className='absolute left-0 top-1/2 transform -translate-y-1/2 z-45 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 focus:outline-none'
          onClick={() => scroll('left')}
        >
          &#9664;
        </button>
        <div
          className='flex overflow-x-hidden px-10 space-x-4 gap-4'
          ref={scrollRef}
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {items.map(item => (
            <div
              key={item.id}
              className='flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'
              style={{ scrollSnapAlign: 'start' }}
            >
              <Component item={item} />
            </div>
          ))}
        </div>
        <button
          className='absolute right-0 top-1/2 transform -translate-y-1/2 z-45 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 focus:outline-none'
          onClick={() => scroll('right')}
        >
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default Home;
