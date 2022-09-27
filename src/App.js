// import logo from './logo.svg';
import './App.css';
import React from "react";
import{Routes, Route, BrowserRouter} from 'react-router-dom'

import Contactus from "./pages/ContactUs"
import GetAllContactus from "./pages/GetAllContactus"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Contactus />} />
        <Route path="/get-all-contactus" element={<GetAllContactus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
