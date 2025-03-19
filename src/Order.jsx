import React, { useState } from "react";
import "./style.css";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";



const ordersData = [
  { id: "1023", customer: "John Doe", amount: "₹2500", status: "Completed" },
  { id: "1024", customer: "Sarah Smith", amount: "₹1800", status: "Pending" },
  { id: "1025", customer: "Michael Lee", amount: "₹2200", status: "Shipped" },
  { id: "1026", customer: "Emma Wilson", amount: "₹9000", status: "Canceled" },
  { id: "1027", customer: "Daniel Brown", amount: "₹5000", status: "Completed" },
  { id: "1028", customer: "Sophia Johnson", amount: "₹1200", status: "Pending" },
  { id: "1029", customer: "James Davis", amount: "₹3200", status: "Shipped" },
  { id: "1030", customer: "Olivia Martin", amount: "₹4100", status: "Completed" },
  { id: "1031", customer: "Benjamin Lee", amount: "₹5500", status: "Canceled" },
  { id: "1032", customer: "Charlotte Clark", amount: "₹1800", status: "Pending" },
  { id: "1033", customer: "Liam Lewis", amount: "₹7500", status: "Shipped" },
  { id: "1034", customer: "Amelia Walker", amount: "₹9000", status: "Completed" },
  { id: "1035", customer: "Lucas Allen", amount: "₹3200", status: "Shipped" },
  { id: "1036", customer: "Mia Young", amount: "₹4000", status: "Completed" },
];


function Orders() {
  const [orders, setOrders] = useState(ordersData);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleStatusChange = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (confirmDelete) {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };
  // -----------chart-----------

  const getStatusCounts = () => {
    const statusCounts = { Pending: 0, Shipped: 0, Completed: 0, Canceled: 0 };

    orders.forEach((order) => {
      statusCounts[order.status] += 1;
    });

    return Object.keys(statusCounts).map((key) => ({
      name: key,
      value: statusCounts[key],
    }));
  };

  const getStatusCounts2 = () => {
    const statusCounts = { Pending: 0, Shipped: 0, Completed: 0, Canceled: 0 };

    orders.forEach((order) => {
      statusCounts[order.status] += 1;
    });

    return Object.keys(statusCounts).map((status) => ({
      name: status,
      count: statusCounts[status],
    }));
  };

  return (
    <>
      <div className="orders-container">
        <h2 style={{fontSize:"35px"}}>Orders Management</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by customer name..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Orders Table */}
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.amount}</td>
                <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowModal(true);
                    }}
                  >
                    View
                  </button>

                  <button
                    className="complete-btn"
                    onClick={() => handleStatusChange(order.id, "Completed")}
                  >
                    Mark Completed
                  </button>

                  <button
                    className="delete-btns"
                    onClick={() => handleDelete(order.id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* Order Details Modal */}
        {showModal && selectedOrder && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <h3>Order Details</h3>
              <p><strong>Order ID:</strong> {selectedOrder.id}</p>
              <p><strong>Customer:</strong> {selectedOrder.customer}</p>
              <p><strong>Amount:</strong> {selectedOrder.amount}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
            </div>
          </div>
        )}
      </div>

      {/* ---------------------chart--------------- */}
      <div className="chart_con">
        <div className="chart-containera">
          <h3 style={{fontSize:"30px"}}>Order Status Overview</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={getStatusCounts()}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              <Cell key="Pending" fill="#FFA500" />
              <Cell key="Shipped" fill="#1E90FF" />
              <Cell key="Completed" fill="#32CD32" />
              <Cell key="Canceled" fill="#FF0000" />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div className="chart-containerb">
          <h3 style={{fontSize:"30px"}}>Order Status Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getStatusCounts2()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </>
  );

}

export default Orders;