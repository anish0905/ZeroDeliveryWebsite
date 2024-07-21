import { createSlice} from '@reduxjs/toolkit'


const smartPhoneSlice = createSlice({
    name:'smartPhone',
    initialState:[],
    reducers: {
        addInitialsmartPhone: (state, action) => {
            
            return action.payload;
          
        }
        
    }
})

export const smartPhoneActions = smartPhoneSlice.actions;

export default smartPhoneSlice;

