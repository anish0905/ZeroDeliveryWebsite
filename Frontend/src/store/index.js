import {configureStore} from '@reduxjs/toolkit'
import fetchStatusSlice from './FetchStatusSlice';
import bagSlice from './BagSlice';
import smartPhoneSlice from './SmartPhoneSlice';
import categoriesSlice from './categoriesSlice';
import userSlice from './userInfoSlice';
import userProfileSlice from './userProfile';


const myntrastore = configureStore({
    reducer: {
        fetchStatus:fetchStatusSlice.reducer,
        bag: bagSlice.reducer,
        smartPhone:smartPhoneSlice.reducer,
        categories: categoriesSlice.reducer,
        user: userSlice.reducer,
        userProfile:userProfileSlice.reducer,
        
    }
})

export default myntrastore;