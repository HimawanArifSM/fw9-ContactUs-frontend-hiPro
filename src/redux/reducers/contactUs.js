import { createSlice } from "@reduxjs/toolkit";
import { editContactUs, getContactUs, postContactUs} from '../actions/contactUs'

const initialState={
    errorMsg: null,
    successMsg: null,
    data:[],
    alldata: [],
    pageInfo:{},
    deleteModal: false
}

const contactUs = createSlice({
    name: 'contactUs',
    initialState,
    reducers:{
        resetmsg: state => {
            state.successmsg = null;
            state.errormsg = null;
        },
        toggleModal: state => {
            state.deleteModal= !state.deleteModal;
        }
    },
    extraReducers: build => {
        build.addCase(postContactUs.pending, state => {
            state.errorMsg = null;
            state.successMsg = null;
        })
        build.addCase(postContactUs.fulfilled, (state, action) => {
            state.data = action.payload.data;
        })
        build.addCase(getContactUs.pending, state => {
            state.errorMsg = null;
            state.successMsg = null;
        })
        build.addCase(getContactUs.fulfilled, (state, action) => {
            state.alldata = action.payload.data;
            state.pageInfo = action.payload.pageInfo;
        })
        build.addCase(editContactUs.pending, state => {
            state.errorMsg = null;
            state.successMsg = null;
        })
        build.addCase(editContactUs.fulfilled, (state, action) => {
            state.successMsg = action.payload.message;
        })
    }
})

export default contactUs.reducer;
export {postContactUs, getContactUs};
export const { resetmsg} = contactUs.actions;
