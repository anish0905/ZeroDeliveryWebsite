import { createSlice } from "@reduxjs/toolkit";

const deliveryBoySlice = createSlice({
    name: "deliveryBoy",
    initialState: [],
    reducers: {
        addDeliveryBoys: (state, action) => {
            console.log("delivery",  action);
            return [...state,...action.payload];
        },
        updateDeliveryBoy: (state, action) => {
            const index = state.findIndex(db => db.id === action.payload.id);
            if(index > -1) {
                state[index] = {...action.payload};
            } else {
                state.push(action.payload);
            }
            return [...state];
        },
        deleteDeliveryBoy: (state, action) => {
            return state.filter(db => db.id!== action.payload);
        },
    },
 });

 export const deliveryBoyActions = deliveryBoySlice.actions;
 
 export default deliveryBoySlice;