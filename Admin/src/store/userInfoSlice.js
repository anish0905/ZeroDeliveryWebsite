import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userId:null
    },
    reducers: {
        updateUser: (state, action) => {
          
            return {...state,...action.payload};
        },
        clearUser: (state) => {
            return {...state, userId: null};
        },
    }
 });

export const userActions = userSlice.actions;

export default userSlice;