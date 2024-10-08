import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URI } from '../../Contants';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import  { categoriesActions } from '../../store/categoriesSlice';
 // Import Spinner component from react-bootstrap

const ItemsCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch()
   // State to track loading

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_URI}/api/prod/category`);
      setCategories(response.data.data);
      setLoading(false); // Set loading to false once data is fetched
     
      dispatch(categoriesActions.addCategory(response.data.data))
    } catch (error) {
      console.error(error);
      setLoading(false); // Set loading to false on error as well
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className='flex flex-wrap px-5 justify-center items-center content-center gap-10 mt-20'>
      {/* Conditional rendering based on isLoading */}
      {isLoading ? (
        <span class="loader"></span>
      ) : (
        categories.map((category, categoryIndex) => {
          const product = category.products[0]; // Get the first product in the category
          const imageUrl = product ? (`${API_URI}/${product.thumbnail}` ||(`${API_URI}/${product.images[0]}` && product.images.length > 0 ? product.images[0] : 'defaultImage.png')) : 'defaultImage.png';

          return (
            <Link to={`/showCategory/${category._id}`} key={categoryIndex} className='flex flex-col justify-evenly items-center w-28 h-40 gap-2'>
              <img 
                src={imageUrl} 
                alt={category._id} 
                className='object-cover cursor-pointer w-28 h-32' 
                onClick={() => console.log(category._id)}
              />
              <h1 className='text-center'>{category._id}</h1>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default ItemsCategory;
