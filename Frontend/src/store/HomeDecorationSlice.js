import {createSlice} from '@reduxjs/toolkit'

const homeDecorationSlice = createSlice({
    name:'homeDecoration',
    initialState:[],
    reducers: {
        addInitialhomeDecoration: (state, action) => {
            return action.payload;
        }
    }
})

export const homeDecorationActions = homeDecorationSlice.actions;
export default homeDecorationSlice;