import {createSlice} from '@reduxjs/toolkit'

const manShirtSlice = createSlice({
    name:'manShirt',
    initialState:[],
    reducers: {
        addInitialmanShirt: (state, action) => {
            return action.payload;
          
        }
        
        
    }

})

export const manShirtActions = manShirtSlice.actions;

export default manShirtSlice; 