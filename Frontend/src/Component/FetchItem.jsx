import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { fetchStatusActions } from '../store/FetchStatusSlice';
import { smartPhoneActions } from '../store/SmartPhoneSlice';

import { userProfileAction } from '../store/userProfile';
import { addressActions } from '../store/addressSlice';
import { API_URI } from '../Contants';

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
        const [productsResp, userResp, addressResp] = await Promise.all([
          axios.get(`${API_URI}/api/products/`, { signal }),
          axios.get(`${API_URI}/user/getGetUser/${userId}`, { signal }),
          axios.get(`${API_URI}/user/get-address/${userId}`, { signal })
        ]);

        setProductDetails(productsResp.data);
        dispatch(smartPhoneActions.addInitialsmartPhone(productsResp.data));
        dispatch(userProfileAction.updateProfile(userResp.data));
        dispatch(addressActions.updateAddress(addressResp.data.address));

        dispatch(fetchStatusActions.markFetchDone());
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(fetchStatusActions.markFetchingFinished());
        controller.abort();
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [dispatch, fetchStatus, userId]);

  return (
    <div>
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
