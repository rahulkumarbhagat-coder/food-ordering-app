import React from "react";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/add/Add";
import List from "./pages/list/List";
import Orders from "./pages/orders/Orders";
import { ToastContainer } from "react-toastify";

const App = () => {

  const url = 'https://food-ordering-app-backend-148t.onrender.com'
  
  return (
    <div className="app">
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Add />} url = {url}/>
          <Route path="/list" element={<List url = {url}/>} />
          <Route path="/orders" element={<Orders url = {url}/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
