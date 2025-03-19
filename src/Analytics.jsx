import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import { Spinner } from "react-bootstrap"; // Import Spinner
import "./style.css"; // Import CSS file

const data = [
  { name: "Jan", sales: 4000, profit: 2400, orders: 300 },
  { name: "Feb", sales: 3000, profit: 1398, orders: 280 },
  { name: "Mar", sales: 2000, profit: 9800, orders: 350 },
  { name: "Apr", sales: 2780, profit: 3908, orders: 320 },
  { name: "May", sales: 1890, profit: 4800, orders: 400 },
];

const pieData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Groceries", value: 200 },
  { name: "Others", value: 100 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const Analysis = () => {
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    // Simulate a data fetching delay
    setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 100);
  }, []);

  return (
    <>
      <div className="heading_ana">Analytics</div>

      {/* Show loading spinner if data is still loading */}
      {loading ? (
        <div className="loading-spinner">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <div className="analysis-container">
          {/* Line Chart - Sales */}
          <div className="chart-card">
            <h2>Sales Analysis</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart - Profit */}
          <div className="chart-card">
            <h2>Profit Comparison</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="profit" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Category Sales */}
          <div className="chart-card">
            <h2>Category Sales Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={100}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Area Chart - Orders */}
          <div className="chart-card">
            <h2>Order Trends</h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Area type="monotone" dataKey="orders" stroke="#ff8042" fill="#ffcc80" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Data Table */}
          <div className="data-table">
            <h2>Data Table</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Sales</th>
                  <th>Profit</th>
                  <th>Orders</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.name}</td>
                    <td>{row.sales}</td>
                    <td>{row.profit}</td>
                    <td>{row.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Analysis;
