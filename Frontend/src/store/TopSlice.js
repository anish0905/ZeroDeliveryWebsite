import {createSlice} from '@reduxjs/toolkit'

const topSlice = createSlice({
    name:'top',
    initialState:[],
    reducers: {
        addInitialtop: (state, action) => {
            return action.payload;
        }
    }
})

export const topActions = topSlice.actions;
export default topSlice;