import {createSlice} from '@reduxjs/toolkit'

const womensDressesSlice = createSlice({
    name:'womensDresses',
    initialState:[],
    reducers: {
        addInitialwomensDresses: (state, action) => {
            return action.payload;
          
        }
        
        
    }

})

export const womensDressesActions = womensDressesSlice.actions;

export default womensDressesSlice; 