import {configureStore} from '@reduxjs/toolkit'
import fetchStatusSlice from './FetchStatusSlice';
import bagSlice from './BagSlice';
import smartPhoneSlice from './SmartPhoneSlice';
import laptopSlice from './LaptopSlice';
import fragrancesSlice from './fragrancesSlice';
import skincareSlice from './SkincareSlice';
import groceriesSlice from './groceriesSlice';
import topSlice from './TopSlice';
import womensDressesSlice from './womensDressesSlice';
import womenShoesSlice from './Womens-shoesSlice';
import manShirtSlice from './Mens-shirtsSlice';
import manShoesSlice from './ManShoesSlice';
import homeDecorationSlice from './HomeDecorationSlice';
import manWatchSlice from './ManWatchSlice';
import womenWatchSlice from './WomenWatchSlice';


const myntrastore = configureStore({
    reducer: {
        fetchStatus:fetchStatusSlice.reducer,
        bag: bagSlice.reducer,
        smartPhone:smartPhoneSlice.reducer,
        laptop:laptopSlice.reducer,
        fragrances:fragrancesSlice.reducer,
        skincare:skincareSlice.reducer,
        groceries:groceriesSlice.reducer,
        homeDecoration:homeDecorationSlice.reducer,
        top:topSlice.reducer,
        womensDresses:womensDressesSlice.reducer,
        womenShoes:womenShoesSlice.reducer,
        manShirt:manShirtSlice.reducer,
        manShoes: manShoesSlice.reducer,
        manWatch:manWatchSlice.reducer,
        womenWatch:womenWatchSlice.reducer,
    }
})

export default myntrastore;