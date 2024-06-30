import {createSlice} from '@reduxjs/toolkit'

const manShoesSlice = createSlice({
    name:'manShoes',
    initialState:[],
    reducers: {
        addInitialmanShoes: (state, action) => {
            return action.payload;
          
        }
        
        
    }

})

export const manShoesActions = manShoesSlice.actions;

export default manShoesSlice; 