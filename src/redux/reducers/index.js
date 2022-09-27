import { combineReducers } from "@reduxjs/toolkit";

import contactUs from './contactUs';
const reducer = combineReducers({
    contactUs: contactUs,
})
export default reducer