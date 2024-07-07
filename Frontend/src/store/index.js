import {configureStore} from '@reduxjs/toolkit'
import fetchStatusSlice from './FetchStatusSlice';
import bagSlice from './BagSlice';
import smartPhoneSlice from './SmartPhoneSlice';
import categoriesSlice from './categoriesSlice';
import userSlice from './userInfoSlice';
import userProfileSlice from './userProfile';
import addressSlice from './addressSlice';


const myntrastore = configureStore({
    reducer: {
        fetchStatus:fetchStatusSlice.reducer,
        bag: bagSlice.reducer,
        smartPhone:smartPhoneSlice.reducer,
        categories: categoriesSlice.reducer,
        user: userSlice.reducer,
        userProfile:userProfileSlice.reducer,
        address: addressSlice.reducer,
        
    }
})

export default myntrastore;