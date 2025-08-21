import React, { useState } from "react";
// Corrected import path assuming order.css is in the same directory as Orders.jsx
import "./order.css";
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
  const [showModal, setShowModal] = useState(false); // For viewing order details
  const [showAddOrderModal, setShowAddOrderModal] = useState(false); // For adding new order
  const [newOrderData, setNewOrderData] = useState({ // State for new order form
    id: "",
    customer: "",
    amount: "",
    status: "Pending", // Default status
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // For custom delete confirmation
  const [orderToDelete, setOrderToDelete] = useState(null); // To store the ID of the order to delete

  // Handles status change for an order
  const handleStatusChange = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  // Filters orders based on search input
  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(search.toLowerCase())
  );

  // Initiates delete confirmation modal
  const handleDeleteClick = (id) => {
    setOrderToDelete(id);
    setShowDeleteConfirm(true);
  };

  // Confirms deletion of an order
  const confirmDelete = () => {
    setOrders(orders.filter((order) => order.id !== orderToDelete));
    setShowDeleteConfirm(false);
    setOrderToDelete(null);
  };

  // Cancels deletion
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setOrderToDelete(null);
  };

  // Handles input changes for the new order form
  const handleNewOrderChange = (e) => {
    const { name, value } = e.target;
    setNewOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Adds a new order to the list
  const handleAddOrder = () => {
    if (!newOrderData.id || !newOrderData.customer || !newOrderData.amount) {
      // In a real app, replace alert with a custom message box
      alert("Please fill in all fields.");
      return;
    }

    setOrders((prevOrders) => [...prevOrders, newOrderData]);
    setNewOrderData({
      id: "",
      customer: "",
      amount: "",
      status: "Pending",
    }); // Reset form
    setShowAddOrderModal(false); // Close modal
  };

  // -----------chart functions-----------
  // Counts orders by status for Pie Chart
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

  // Counts orders by status for Bar Chart (same logic, different return format)
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

  // Colors for the Pie Chart slices
  const PIE_COLORS = {
    Pending: "#ffab00", // Orange
    Shipped: "#29b6f6", // Light Blue
    Completed: "#66bb6a", // Green
    Canceled: "#ef5350", // Red
  };

  return (
    <>
      <div className="orders-container">
        <h2 style={{ fontSize: "35px" }}>Orders Management</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by customer name..."
          className="search-order-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Add New Order Button */}
        <button
          className="add-new-order-btn"
          onClick={() => setShowAddOrderModal(true)}
        >
          Add New Order
        </button>

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
                <td className="actions-btn">
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
                    onClick={() => handleDeleteClick(order.id)}
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

        {/* Add New Order Modal */}
        {showAddOrderModal && (
          <div className="modal_order">
            <div className="modal-content-order">
              <span className="close" onClick={() => setShowAddOrderModal(false)}>&times;</span>
              <h3>Add New Order</h3>
              <div className="add-order-form">
                <label>
                  Order ID:
                  <input
                    type="text"
                    name="id"
                    value={newOrderData.id}
                    onChange={handleNewOrderChange}
                  />
                </label>
                <label>
                  Customer Name:
                  <input
                    type="text"
                    name="customer"
                    value={newOrderData.customer}
                    onChange={handleNewOrderChange}
                  />
                </label>
                <label>
                  Amount:
                  <input
                    type="text"
                    name="amount"
                    value={newOrderData.amount}
                    onChange={handleNewOrderChange}
                  />
                </label>
                <label>
                  Status:
                  <select name="status" value={newOrderData.status} onChange={handleNewOrderChange}>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Completed">Completed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </label>
                <button className="add-order-submit-btn" onClick={handleAddOrder}>Add Order</button>
              </div>
            </div>
          </div>
        )}

        {/* Custom Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="modal">
            <div className="modal-content">
              <h3>Confirm Deletion</h3>
              <p>Are you sure you want to delete this order?</p>
              <div className="modal-actions">
                <button className="delete-confirm-btn confirm" onClick={confirmDelete}>Delete</button>
                <button className="delete-confirm-btn cancel" onClick={cancelDelete}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ---------------------chart--------------- */}
      <div className="chart_con">
        <div className="chart-containera">
          <h3 style={{ fontSize: "30px" }}>Order Status Overview</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={getStatusCounts()}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {getStatusCounts().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </>
  );
}

export default Orders;
