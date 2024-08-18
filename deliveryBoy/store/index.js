import {configureStore} from '@reduxjs/toolkit'
import bagSlice from './bagSlice'
import addressSlice from './addressSlice'
import userSlice from './userProfile'

const zeroDeliveryStore = configureStore({
    reducer: {
        // Define your reducers here
        bag: bagSlice.reducer,
        address: addressSlice.reducer,
        user: userSlice.reducer


    }
})

export default zeroDeliveryStore