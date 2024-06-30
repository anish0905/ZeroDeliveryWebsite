import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { fetchStatusActions } from '../store/FetchStatusSlice';
import { smartPhoneActions } from '../store/SmartPhoneSlice';
import { laptopActions } from '../store/LaptopSlice';
import { fragrancesActions } from '../store/fragrancesSlice';
import { skincareActions } from '../store/SkincareSlice';
import { groceriesActions } from '../store/groceriesSlice';
import { topActions } from '../store/TopSlice';
import { womensDressesActions } from '../store/womensDressesSlice';
import { womenShoesActions } from '../store/Womens-shoesSlice';
import { manShirtActions } from '../store/Mens-shirtsSlice';
import { homeDecorationActions } from '../store/HomeDecorationSlice';
import { manShoesActions } from '../store/ManShoesSlice';
import { manWatchActions } from '../store/ManWatchSlice';
import { womenWatchActions } from '../store/WomenWatchSlice';


const FetchItem = () => {
    const fetchStatus=useSelector(store=>store.fetchStatus);

    const dispatch = useDispatch ();

    useEffect(()=>{
      if(fetchStatus.fetchDone) return;

      const controller = new AbortController();
      const signal = controller.signal;
      
      const endpoints = [
        {url:'https://dummyjson.com/products/category/smartphones',action:smartPhoneActions.addInitialsmartPhone},
        {url:"https://dummyjson.com/products/category/laptops",action:laptopActions.addInitiallaptop},
        {url:"https://dummyjson.com/products/category/fragrances",action:fragrancesActions.addInitialfragrances},
        {url:"https://dummyjson.com/products/category/skincare",action:skincareActions.addInitialskincare},
        {url:"https://dummyjson.com/products/category/groceries",action:groceriesActions.addInitialGroceries},
        {url:"https://dummyjson.com/products/category/home-decorations",action:homeDecorationActions.addInitialhomeDecoration},
        {url:"https://dummyjson.com/products/category/tops",action:topActions.addInitialtop},
        {url:"https://dummyjson.com/products/category/womens-dresses",action:womensDressesActions.addInitialwomensDresses},
        {url:"https://dummyjson.com/products/category/women-shoes",action:womenShoesActions.addInitialwomenShoes},
        {url:"https://dummyjson.com/products/category/man-shirt",action:manShirtActions.addInitialmanShirt},
        {url:"https://dummyjson.com/products/category/mens-shirts",action:manShirtActions.addInitialmanShirt},
        {url:"https://dummyjson.com/products/category/mens-shoes", action:manShoesActions.addInitialmanShoes},
        {url:"https://dummyjson.com/products/category/mens-watches", action:manWatchActions.addInitialmanWatch},
        {url:"https://dummyjson.com/products/category/womens-watches", action:womenWatchActions.addInitialwomenWatch},
      ]
      
      for (const { url, action } of endpoints) {
      dispatch(fetchStatusActions.markFetchingStarted());
      fetch(url,{signal})
      .then((response)=>response.json())
      .then(({products})=>{
         dispatch(fetchStatusActions.markFetchDone());
         dispatch(action(products));
         dispatch(fetchStatusActions.markFetchingFinished());
       })
      }

    },[fetchStatus])


    
  return (
    <>
    </>
  )
}

export default FetchItem
