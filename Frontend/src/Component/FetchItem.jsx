import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'; // Make sure axios is imported

import { fetchStatusActions } from '../store/FetchStatusSlice';
import { smartPhoneActions } from '../store/SmartPhoneSlice';
import { API_URI } from '../Contants';
import { userProfileAction } from '../store/userProfile';

const FetchItem = () => {
  const fetchStatus = useSelector(state => state.fetchStatus);
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState(null); 
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (fetchStatus.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchStatusActions.markFetchingStarted());

    const fetchData = async () => {
      try {
       
        const resp = await axios.get(`${API_URI}/api/products/`, { signal });

        setProductDetails(resp.data);
        dispatch(fetchStatusActions.markFetchDone());
        dispatch(smartPhoneActions.addInitialsmartPhone(resp.data));
        dispatch(fetchStatusActions.markFetchingFinished());
      } catch (error) {
        console.log(error);
      } finally {
        controller.abort(); 
      }
    };

    fetchData();

    return () => {
      controller.abort(); // Cleanup on unmount or if fetch is no longer needed
    };
  }, [dispatch, fetchStatus]);

  const FetchUserDeatils = async(userId) =>{
    try {
      const resp = await axios.get(`${API_URI}/user/getGetUser/${userId}`)
      dispatch(userProfileAction.updateProfile(resp.data));


    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    FetchUserDeatils(userId);
  }, []);

  return (
    <div>
      {/* Render your fetched data here */}
      {productDetails && (
        <ul>
          {productDetails.map(product => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FetchItem;
