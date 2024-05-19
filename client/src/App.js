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
import Profile from "./Components/Profile/Profile";
import Footer from "./Components/Footer/Footer";

const App = () => {

  return (
    <AuthProvider>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route exact path="/Initiatives" element={<Initiatives />} />
      </Routes>
      <Routes>
        <Route exact path="/Community" element={<Community />} />
      </Routes>
      <Routes>
        <Route exact path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route exact path="/register" element={<Register />} />
      </Routes>
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
      
    </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
