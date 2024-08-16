import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SmartPhone from './SmartPhone';
import Banner from '../Component/Banner';
import ItemsCategory from '../routes/catgories/ItemsCategory';
import ItemCards from '../Component/ItemCards';
import NavBar1 from '../Component/NavBar/NavBar1';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const smartPhones = useSelector(store => store.smartPhone);

  // Function to filter smartphones based on search query
  const filterSmartPhones = (query) => {
    if (!query) return smartPhones;
    return smartPhones.filter(smartPhone =>
      smartPhone.title?.toLowerCase()?.includes(query.toLowerCase()) ||
      smartPhone.brand?.toLowerCase()?.includes(query.toLowerCase()) ||
      smartPhone.category?.toLowerCase()?.includes(query.toLowerCase())
    );
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Get filtered smartphones based on the search query
  const filteredSmartPhones = filterSmartPhones(searchQuery);

  return (
    <div className='flex flex-col'>
      <NavBar1 searchQuery={searchQuery} handleSearch={handleSearch} />
      
      {/* Conditionally render Banner and ItemCards */}
      {!searchQuery && (
        <>
          <Banner />
          <ItemCards />
        </>
      )}

      {/* Display search results if there are any */}
      {filteredSmartPhones.length > 0 && (
        <div className='px-5 py-3'>
          <h2 className='text-xl font-bold mb-4'>Search Results</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {filteredSmartPhones.map(item => (
              <SmartPhone key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* If no search query and no search results, show categories */}
      {!searchQuery && (
        <ItemsCategory />
      )}
    </div>
  );
};

export default Home;
