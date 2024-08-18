import {configureStore} from '@reduxjs/toolkit'
import bagSlice from './bagSlice'
import addressSlice from './addressSlice'

const zeroDeliveryStore = configureStore({
    reducer: {
        // Define your reducers here
        bag: bagSlice.reducer,
        address: addressSlice.reducer,


    }
})

export default zeroDeliveryStore