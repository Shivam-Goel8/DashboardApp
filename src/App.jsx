import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Order from "./Order/Order";
import Product from "./Product/Product";
import Customer from "./customer/Customer"
import Reports from "./Reports/Reports";
import Slidbar from './Slidebar/Slidbar'
import Setting from "./Setting/Setting";

function App() {

  return (
    <Router>
      <div>
        <Slidbar />
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/order" element={<Order />} />
            <Route path="/product" element={<Product />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/setting" element={<Setting/>} />
            <Route path="/analytics" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

