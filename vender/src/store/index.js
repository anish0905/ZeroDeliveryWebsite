import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userInfoSlice';
import deliveryBoySlice from './deliveryBoyDetailsSlice';


const myntrastore = configureStore({
    reducer: {
        user: userSlice.reducer,
        deliveryBoy:deliveryBoySlice.reducer,
       
    }
})

export default myntrastore;