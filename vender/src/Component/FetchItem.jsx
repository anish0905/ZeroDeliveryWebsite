import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { fetchStatusActions } from '../store/FetchStatusSlice';
import { smartPhoneActions } from '../store/SmartPhoneSlice';
import {API_URI} from "../Contants"
import { userProfileAction } from '../store/userProfile';
import { addressActions } from '../store/addressSlice';
import { bagActions } from '../store/BagSlice';

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

    const fetchProductDetails = async () => {
      try {
        const resp = await axios.get(`${API_URI}/api/products/`, { signal });

        setProductDetails(resp.data);
        dispatch(smartPhoneActions.addInitialsmartPhone(resp.data));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const resp = await axios.get(`${API_URI}/user/getGetUser/${userId}`, { signal });
        dispatch(userProfileAction.updateProfile(resp.data));
      } catch (error) {
        console.log(error);
      }
    };
    const fetchItems = async () => {
      try {
        const resp = await axios.get(`${API_URI}/api/cart/totalProductQuantity/${userId}`);
        // console.log(resp.data.data)
        dispatch(bagActions.addToBag(resp.data));
      } catch (error) {
        console.error("error", error);
      }
    };

    const fetchAddress = async () => {
      try {
        const resp = await axios.get(`${API_URI}/user/get-address/${userId}`, { signal });
        dispatch(addressActions.updateAddress(resp.data.address));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchData = async () => {
      try {
        await Promise.all([fetchProductDetails(), fetchUserDetails(), fetchAddress(),fetchItems()]);
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
