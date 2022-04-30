import React from 'react';
import './App.css';
import { HashRouter , Routes ,Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Register  from "./components/Register/register";
import Login  from "./components/Login/login";
import Info from "./components/Information/infromation";
import homepage from "./components/HomePage/homepage";

function App() {
  return (
    <HashRouter>
      <Routes >
        <Route path="/" exact element={<LandingPage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        {/* <Route path="/homepage" element={<Homepage/>}/> */}
        <Route path="/infromation" element={<information/>} />

<Route path="/" element={<Info/>} />
      </Routes >
    </HashRouter>
  );
}

export default App;
