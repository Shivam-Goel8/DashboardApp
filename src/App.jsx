import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Order from "./Order";
import Product from "./Product";
import User from "./User";
import Login from "./Login";
import Analytics from "./Analytics";
import Slidbar from './Slidebar/Slidbar'

function App() {
  return (
    <Router  >
      <div>
        <Slidbar /> 
        <div >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/order" element={<Order />} />
            <Route path="/product" element={<Product />} />
            <Route path="/user" element={<User />} />
            <Route path="/login" element={<Login />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
