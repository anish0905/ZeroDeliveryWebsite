import {createSlice} from '@reduxjs/toolkit'

const groceriesSlice = createSlice({
    name:'groceries',
    initialState:[],
    reducers: {
        addInitialGroceries: (state, action) => {
            return action.payload;
        }
    }
})

export const groceriesActions = groceriesSlice.actions;
export default groceriesSlice;