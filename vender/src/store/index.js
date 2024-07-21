import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userInfoSlice';


const myntrastore = configureStore({
    reducer: {
        user: userSlice.reducer,
       
    }
})

export default myntrastore;