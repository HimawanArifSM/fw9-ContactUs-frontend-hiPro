import { createSlice } from "@reduxjs/toolkit";
import {postContactUs} from '../actions/contactUs'

const initialState={
    errorMsg: null,
    successMsg: null,
    data:[],
}

const contactUs = createSlice({
    name: 'contactUs',
    initialState,
    reducers:{
        resetmsg: state => {
            state.successmsg = null;
            state.errormsg = null;
          },
    },
    extraReducers: build => {
        build.addCase(postContactUs.pending, state => {
            state.errorMsg = null;
            state.successMsg = null;
        })
        build.addCase(postContactUs.fulfilled, (state, action) => {
            state.data = action.payload.data;
        })
    }
})

export default contactUs.reducer;
export {postContactUs};
export const { resetmsg} = contactUs.actions;
