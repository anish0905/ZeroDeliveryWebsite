import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
    name: "categories",
    initialState: [],
    reducers: {
        addCategory: (state, action) => {
            return [...state, action.payload];
        },
        removeCategory: (state, action) => {
            return state.filter((category) => category.id!== action.payload);
        },
    },
})

export const categoriesActions = categoriesSlice.actions;

export default categoriesSlice;