import { useState } from "react";
import {  Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage.jsx";
import CreateCampaign from "./pages/CreateCampaign.jsx";
import Navbar from "./components/Navbar.jsx";
import Campaigns from "./pages/Campaigns.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter >
    
  
        <Navbar/>
        <ToastContainer />
      <div className="md:pt-18 pt-24">
        <Routes>
        
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/CreateCampaign" element={<CreateCampaign/>}/>
        <Route path="/campaigns" element={<Campaigns/>}/>
        
      </Routes>
      </div>
 
    </BrowserRouter>
  );
}

export default App;
