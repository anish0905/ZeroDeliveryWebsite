import {createSlice} from '@reduxjs/toolkit'

const fragrancesSlice = createSlice({
    name:'fragrances',
    initialState:[],
    reducers: {
        addInitialfragrances: (state, action) => {
            return action.payload;  
        }
        
    }
})

export const fragrancesActions = fragrancesSlice.actions;

export default fragrancesSlice;