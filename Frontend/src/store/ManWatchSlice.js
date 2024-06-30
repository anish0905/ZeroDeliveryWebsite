import {createSlice} from '@reduxjs/toolkit'

const manWatchSlice = createSlice({
    name:'manWatch',
    initialState:[],
    reducers: {
        addInitialmanWatch: (state, action) => {
            return action.payload;  
        }
        
    }
})

export const manWatchActions = manWatchSlice.actions;

export default manWatchSlice;