import React from "react";
import "./Reports.css";
import {
  PieChart, Pie, Cell, Tooltip as PieTooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend as BarLegend,
  LineChart, Line, AreaChart, Area, Tooltip ,Legend 
} from "recharts";

// Dummy Data
const summaryCards = [
  { title: "Total Sales", value: "$12,500", color: "#38bdf8" },
  { title: "Orders", value: "1,250", color: "#4ade80" },
  { title: "Products", value: "320", color: "#fbbf24" },
  { title: "Customers", value: "890", color: "#f87171" },
];

const orderData = [
  { name: "Completed", value: 60 },
  { name: "Pending", value: 25 },
  { name: "Canceled", value: 15 },
];

const productData = [
  { name: "Product A", stock: 40 },
  { name: "Product B", stock: 25 },
  { name: "Product C", stock: 70 },
  { name: "Product D", stock: 30 },
];

const customerData = [
  { month: "Jan", customers: 30 },
  { month: "Feb", customers: 50 },
  { month: "Mar", customers: 45 },
  { month: "Apr", customers: 70 },
];

const revenueData = [
  { month: "Jan", revenue: 5000 },
  { month: "Feb", revenue: 7000 },
  { month: "Mar", revenue: 6500 },
  { month: "Apr", revenue: 9000 },
];

const salesTrendData = [
  { day: "Mon", sales: 120 },
  { day: "Tue", sales: 200 },
  { day: "Wed", sales: 150 },
  { day: "Thu", sales: 300 },
  { day: "Fri", sales: 250 },
  { day: "Sat", sales: 400 },
  { day: "Sun", sales: 350 },
];

const ordersTableData = [
  { id: 1, customer: "Rahul", product: "Product A", status: "Completed" },
  { id: 2, customer: "Anita", product: "Product B", status: "Pending" },
  { id: 3, customer: "Vikram", product: "Product C", status: "Shipped" },
  { id: 4, customer: "Sonia", product: "Product D", status: "Canceled" },
];

const DashboardFull = () => {
  const COLORS = ["#4ade80", "#fbbf24", "#f87171"];

  return (
    <div className="dashboard-full-container">
      <h2>Admin Dashboard</h2>

      {/* Summary Cards */}
      <div className="summary-cards">
        {summaryCards.map((card, idx) => (
          <div className="summary-card" key={idx} style={{ borderTop: `4px solid ${card.color}` }}>
            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Orders Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={orderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {orderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <PieTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Products Stock</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
              <XAxis dataKey="name" stroke="#f1f5f9"/>
              <YAxis stroke="#f1f5f9"/>
              <BarLegend />
              <Tooltip />
              <Bar dataKey="stock" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Customer Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={customerData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
              <XAxis dataKey="month" stroke="#f1f5f9"/>
              <YAxis stroke="#f1f5f9"/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="customers" stroke="#4ade80" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Revenue Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#f1f5f9"/>
              <YAxis stroke="#f1f5f9"/>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#38bdf8" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Weekly Sales Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
              <XAxis dataKey="day" stroke="#f1f5f9"/>
              <YAxis stroke="#f1f5f9"/>
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#fbbf24" strokeWidth={3}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders Table */}
      <div className="table-card">
        <h3>Recent Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ordersTableData.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardFull;
