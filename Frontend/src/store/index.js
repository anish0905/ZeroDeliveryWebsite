import {configureStore} from '@reduxjs/toolkit'
import fetchStatusSlice from './FetchStatusSlice';
import bagSlice from './BagSlice';
import smartPhoneSlice from './SmartPhoneSlice';
import categoriesSlice from './categoriesSlice';


const myntrastore = configureStore({
    reducer: {
        fetchStatus:fetchStatusSlice.reducer,
        bag: bagSlice.reducer,
        smartPhone:smartPhoneSlice.reducer,
        categories: categoriesSlice.reducer
        
    }
})

export default myntrastore;