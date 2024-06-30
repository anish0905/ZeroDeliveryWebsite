import { createSlice} from '@reduxjs/toolkit'


const laptopSlice = createSlice({
    name:'laptop',
    initialState:[],
    reducers: {
        addInitiallaptop: (state, action) => {
            return action.payload;
          
        }
    
    }
})

export const laptopActions = laptopSlice.actions;

export default laptopSlice;

