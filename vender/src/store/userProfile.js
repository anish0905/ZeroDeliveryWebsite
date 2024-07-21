import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState: {
        userProfile:null,
    },
    reducers: {
        updateProfile: (state, action) => {
            return {...state,...action.payload};
        },
        clearProfile: (state) => {
            return {...state, userProfile: null};
        },

    },
 });

export const userProfileAction = userProfileSlice.actions;

export default userProfileSlice;