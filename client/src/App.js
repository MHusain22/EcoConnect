import React from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Initiatives from "./Components/Initiatives/Initiatives";
import Navbar from "./Components/Home/Navbar/Navbar";
import Community from "./Components/Community/Community";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import AuthProvider from "./Components/Context/AuthContext";

const App = () => {

  return (
    <AuthProvider>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route exact path="/Home" element={<Home />} />
      </Routes>
      <Routes>
        <Route  path="/Initiatives" element={<Initiatives />} />
      </Routes>
      <Routes>
        <Route  path="/Community" element={<Community />} />
      </Routes>
      <Routes>
        <Route  path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route  path="/register" element={<Register />} />
      </Routes>
      
      
    </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
