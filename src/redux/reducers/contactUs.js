import { createSlice } from "@reduxjs/toolkit";
import { editContactUs, getContactUs, postContactUs} from '../actions/contactUs'

const initialState={
    errorMsg: null,
    successMsg: null,
    data:[],
    alldata: [],
    pageInfo:{},
    deleteModal: false,
    lim:'',
    pages: '',
    seacrhed: '',
    sorted: '',
    sortedBy: '',
    seacrhedBy: '',
    fullname: '',
    email:'',
    message:'',
    id: '',
}

const contactUs = createSlice({
    name: 'contactUs',
    initialState,
    reducers:{
        resetmsg: state => {
            state.successMsg = null;
            state.errorMsg = null;
        },
        toggleModal: state => {
            state.deleteModal= !state.deleteModal;
        },
        getLim: (state, action) => {
            state.lim = action.payload
        },
        getPages: (state, action) => {
            state.pages = action.payload
        },
        getSeacrhed: (state, action) => {
            state.seacrhed = action.payload
        },
        getSorted: (state, action) => {
            state.sorted = action.payload
        },
        getSortedBy: (state, action) => {
            state.sortedBy = action.payload
        },
        getSeacrhedBy: (state, action) => {
            state.seacrhedBy = action.payload
        },
        editFullname: (state, action) => {
            state.fullname = action.payload
        },
        editEmail: (state, action) => {
            state.email = action.payload
        },
        editMessage: (state, action) => {
            state.message = action.payload
        },
        editId: (state, action) => {
            state.id = action.payload
        },
    },
    extraReducers: build => {
        build.addCase(postContactUs.pending, state => {
            state.errorMsg = null;
            state.successMsg = null;
        })
        build.addCase(postContactUs.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.successMsg = action.payload.message
        })
        build.addCase(getContactUs.pending, state => {
            state.errorMsg = null;
            state.successMsg = null;
        })
        build.addCase(getContactUs.fulfilled, (state, action) => {
            state.alldata = action.payload.data;
            state.pageInfo = action.payload.pageInfo;
            state.successMsg = action.payload.message;
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
export const { resetmsg, getLim, getPages, getSeacrhed, getSeacrhedBy, getSorted, getSortedBy, editFullname, editEmail, editMessage, editId} = contactUs.actions;
