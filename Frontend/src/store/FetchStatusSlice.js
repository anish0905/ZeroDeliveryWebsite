import {createSlice} from '@reduxjs/toolkit'

const fetchStatusSlice = createSlice({
 name:'fetchStatus',
 initialState: {
    fetchDone: false,  // false 'pending' and true 'done'
    currentlyFetching: false,
 },

 reducers: {
    markFetchDone:(state)=>{
        return !state.fetchDone;
    },
    markFetchingStarted:(state)=>{
        return !state.currentlyFetching ;
    },
    markFetchingFinished:(state)=>{
        return !state.currentlyFetching;
    }
 }

});

export const fetchStatusActions = fetchStatusSlice.actions;

export default fetchStatusSlice;