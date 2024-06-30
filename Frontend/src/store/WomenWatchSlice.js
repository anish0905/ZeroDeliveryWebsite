import {createSlice} from '@reduxjs/toolkit'

const womenWatchSlice = createSlice({
    name:'womenWatch',
    initialState:[],
    reducers: {
        addInitialwomenWatch: (state, action) => {
            console.log(state, action)
            return action.payload;
          
        }
        
        
    }

})

export const womenWatchActions = womenWatchSlice.actions;

export default womenWatchSlice; 