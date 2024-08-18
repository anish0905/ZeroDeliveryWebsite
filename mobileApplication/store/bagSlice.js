import { createSlice } from '@reduxjs/toolkit';

const bagSlice = createSlice({
  name: 'bag',
  initialState: {
    data: [],
    totalQuantity: 0
  },
  reducers: {
    addToBag: (state, action) => {
      console.log("action",action);
        state.totalQuantity = action.payload.totalQuantity
        state.data.push(action.payload.data);
    },
    removeFromBag: (state, action) => {
      const productIdToRemove = action.payload.productId;
      
      // Flatten the nested data structure
      const flattenedData = state.data.flat();
      
      // Filter out the item that matches the productId
      const filteredData = flattenedData.filter(item => item.productId !== productIdToRemove);
      
      // Re-nest the data structure if necessary
      const nestedData = [filteredData];
      
      // Update the state
      state.data = nestedData;
      state.totalQuantity = nestedData.flat().reduce((total, item) => total + (item.quantity || 1), 0);
    },
    clearBag: (state) => {
      // Clear the bag
      state.data = [];
      state.totalQuantity = 0;
    },
    increaseQuantity: (state, action) => {
      const productIdToIncrease = action.payload.productId;
      
      // Find the item in the bag
      const itemToIncrease = state.data.flat().find(item => item.productId === productIdToIncrease);
      
      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
        state.totalQuantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const productIdToDecrease = action.payload.productId;
      
      // Find the item in the bag
      const itemToDecrease = state.data.flat().find(item => item.productId === productIdToDecrease);
      
      if (itemToDecrease) {
        if (itemToDecrease.quantity > 1) {
          itemToDecrease.quantity -= 1;
          state.totalQuantity -= 1;
        } else {
          // Remove the item from the bag if quantity is 1
          const updatedData = state.data.flat().filter(item => item.productId !== productIdToDecrease);
          state.data = [updatedData];
          state.totalQuantity -= 1; // Decrease total quantity
        }
      }}}
    
  
});

export const bagActions = bagSlice.actions;

export default bagSlice;


