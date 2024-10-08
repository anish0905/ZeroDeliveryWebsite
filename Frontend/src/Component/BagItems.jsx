import React from 'react';
import { useDispatch } from 'react-redux';
import { IoBagRemoveSharp,IoBagAddSharp } from "react-icons/io5";
import { bagActions } from '../store/BagSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {API_URI} from "../Contants"


const BagItems = ({ item }) => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');

  const addItem = async() => {
    try {
      const resp = await axios.put(`${API_URI}/api/cart/addProductQuantityByOne`,{
        userId,
        productId: item._id,
      })
      dispatch(bagActions.increaseQuantity({productId: item._id}))
      
    } catch (error) {
      console.error('Error adding item to bag:', error);
      
    }
  }

  const subItem = async() => {
    try {
      const resp = await axios.put(`${API_URI}/api/cart/subProductQuantityByOne`,{
        userId,
        productId: item._id,
      })
      dispatch(bagActions.decreaseQuantity({productId: item._id}))

      
    } catch (error) {
      console.error('Error subtracting item from bag:', error);
      
    }
  }

 
  const deliveryDate = new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000);
  const formattedDeliveryDate = deliveryDate.toDateString();

  const returnDate = new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000);
  const formattedReturnDate = returnDate.toDateString();

  return (
    <div className='lg:flex border-2 border-solid rounded gap-5 block justify-center'>
      <Link to={`/productDetails/${item._id}`} className='p-6 lg:w-64 h-auto w-full md:w-64'>
        <img src={`${API_URI}/${item.thumbnail}`} alt={item.title} className=' rounded object-cover'/>
      </Link>
      <div  className='p-10'>
        <div className='my-1'>
          <p className='text-xl font-semibold my-1'>{item.brand}</p>
          <p className='text-gray-400 text-sm font-thin'>{item.title}</p>
        </div>
        <div className='flex gap-2 my-1 items-center content-center'>
          <span>RS {item.price}</span>
          <span className='text-gray-400 text-sm font-thin line-through'>RS {item.price + item.price * (item.discountPercentage/100)} </span>
          <span  className='text-pink-400 text-sm font-thin'>({item.discountPercentage}% OFF)</span>
        </div>
        <div>
          <span className='font-semibold me-2'>{Math.floor(Math.random() * 15) + 1} days</span> return available
        </div>
        <div>
          Delivery by 
          <span className='text-cyan-400 ml-2'>{formattedDeliveryDate}</span>
        </div>
        <div className='my-4 w-full flex justify-center content-center items-center'>
          <button
            className="bg-green-400 w-full rounded-s text-white py-1 h-8 flex justify-center content-center items-center gap-2"
            onClick={addItem}
          >
            <IoBagAddSharp className="text-2xl" />
            
          </button>
          <p className='bg-blue-400 w-full  text-white py-1 h-8 flex justify-center content-center items-center gap-2'>{item.quantity}</p>
          <button
            className="bg-red-400 w-full rounded-e text-white py-1 h-8 flex justify-center content-center items-center gap-2"
            onClick={subItem}
          >
            <IoBagRemoveSharp className="text-2xl" />
           
          </button>
        </div>  
      </div>
    </div>
  );
}

export default BagItems;
