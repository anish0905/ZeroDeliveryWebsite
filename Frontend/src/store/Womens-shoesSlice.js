import {createSlice} from '@reduxjs/toolkit'

const womenShoesSlice = createSlice({
    name:'womenShoes',
    initialState:[],
    reducers: {
        addInitialwomenShoes: (state, action) => {
            console.log(state, action)
            return action.payload;
          
        }
        
        
    }

})

export const womenShoesActions = womenShoesSlice.actions;

export default womenShoesSlice; 