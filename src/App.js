import React from 'react';
import './App.css';
import { HashRouter , Routes ,Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Register  from "./components/Register/register";
import Login  from "./components/Login/login";
import Info from "./components/Information/infromation";

function App() {
  return (
    <HashRouter>
      <Routes >
        <Route path="/" exact element={<LandingPage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />


      </Routes >
    </HashRouter>
  );
}

export default App;
