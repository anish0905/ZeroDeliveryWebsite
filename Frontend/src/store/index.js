import {configureStore} from '@reduxjs/toolkit'
import fetchStatusSlice from './FetchStatusSlice';
import bagSlice from './BagSlice';
import smartPhoneSlice from './SmartPhoneSlice';


const myntrastore = configureStore({
    reducer: {
        fetchStatus:fetchStatusSlice.reducer,
        bag: bagSlice.reducer,
        smartPhone:smartPhoneSlice.reducer,
        
    }
})

export default myntrastore;