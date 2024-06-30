import {createSlice} from '@reduxjs/toolkit'

const skincareSlice = createSlice({
    name:'skincare',
    initialState:[],
    reducers: {
        addInitialskincare: (state, action) => {
            return action.payload;
          
        }
        
        
    }

})

export const skincareActions = skincareSlice.actions;

export default skincareSlice; 