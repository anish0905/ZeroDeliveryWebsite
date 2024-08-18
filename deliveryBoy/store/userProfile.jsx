import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: [],
    },
    reducers: {
        addUsers: (state, action) => {
            return {...state, uses: [...state.uses,...action.payload]};
        },
        removeUsers: (state, action) => {
            return {...state, uses: state.uses.filter((use) => use.id!== action.payload)};
        },
    },
    

})

export const userActions = userSlice.actions;

export default userSlice;

