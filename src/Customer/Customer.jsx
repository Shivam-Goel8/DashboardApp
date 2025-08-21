import React, { useState } from "react";

import { Table, Input, Button, Select, Tag, Modal, Form, } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, DownloadOutlined } from "@ant-design/icons";
import {
  PieChart, Pie, Cell,
  Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer
} from "recharts";

import "./customer.css";

const { Search } = Input;
const { Option } = Select;

const User = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Vendor", status: "Suspended" },
    { id: 4, name: "Amit Sharma", email: "amit.sharma@example.com", role: "Admin", status: "Active" },
    { id: 5, name: "Priya Verma", email: "priya.verma@example.com", role: "User", status: "Active" },
    { id: 6, name: "Rahul Mehta", email: "rahul.mehta@example.com", role: "Vendor", status: "Inactive" },
    { id: 7, name: "Neha Kapoor", email: "neha.kapoor@example.com", role: "User", status: "Suspended" },
    { id: 8, name: "Vikram Singh", email: "vikram.singh@example.com", role: "Admin", status: "Active" },
    { id: 9, name: "Anjali Nair", email: "anjali.nair@example.com", role: "User", status: "Inactive" },
    { id: 10, name: "Suresh Iyer", email: "suresh.iyer@example.com", role: "Vendor", status: "Active" },
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Vendor", status: "Suspended" },
    { id: 4, name: "Amit Sharma", email: "amit.sharma@example.com", role: "Admin", status: "Active" },
    { id: 5, name: "Priya Verma", email: "priya.verma@example.com", role: "User", status: "Active" },
    { id: 6, name: "Rahul Mehta", email: "rahul.mehta@example.com", role: "Vendor", status: "Inactive" },
  ]);

  const [searchText, setSearchText] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState(null);

  const handleSearch = (value) => setSearchText(value.toLowerCase());
  const handleRoleFilter = (value) => setFilterRole(value);
  const handleDelete = (id) => setUsers(users.filter((user) => user.id !== id));

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleSaveUser = () => {
    form.validateFields().then((values) => {
      if (editingUser) {
        setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...values } : u)));
      } else {
        setUsers([...users, { id: users.length + 1, ...values }]);
      }
      setIsModalVisible(false);
    });
  };

  const handleExportCSV = () => {
    const headers = ["ID,Name,Email,Role,Status"];
    const rows = users.map(u => `${u.id},${u.name},${u.email},${u.role},${u.status}`);
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Admin", value: "Admin" },
        { text: "User", value: "User" },
        { text: "Vendor", value: "Vendor" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Active" ? "green" : status === "Inactive" ? "volcano" : "red"
          }
          style={{ fontWeight: "bold", padding: "4px 10px", borderRadius: "6px" }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} className="edits-bt" onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} danger className="d-b" onClick={() => handleDelete(record.id)} />
        </>
      ),
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchText) || user.email.toLowerCase().includes(searchText);
    const matchesRole = filterRole ? user.role === filterRole : true;
    return matchesSearch && matchesRole;
  });

  const chartData = [
    { name: "Admin", count: users.filter(u => u.role === "Admin").length },
    { name: "User", count: users.filter(u => u.role === "User").length },
    { name: "Vendor", count: users.filter(u => u.role === "Vendor").length },
    { name: "Active", count: users.filter(u => u.status === "Active").length },
    { name: "Inactive", count: users.filter(u => u.status === "Inactive").length },
    { name: "Suspended", count: users.filter(u => u.status === "Suspended").length },
  ];

  return (
    <div className="user-management-container">
      <h2 className="title_user">🎯 Customer Management</h2>
      <div className="controls">
        <Search placeholder=" Search Users" onSearch={handleSearch} className="search-bar-customer" />
        <Button type="primary" className="add-user-btn" icon={<PlusOutlined />} onClick={handleAddUser}>Add User</Button>
        <Button className="export-user-btn" icon={<DownloadOutlined />} onClick={handleExportCSV}>Export CSV</Button>
      </div>

      <Table dataSource={filteredUsers} columns={columns} rowKey="id" className="customer-table" pagination={{ pageSize: 7 }} scroll={{ x: "max-content" }} />

      <Modal
        title={editingUser ? "✏️ Edit User" : "➕ Add User"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSaveUser}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter user name!" }]}><Input /></Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter user email!" }]}><Input /></Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true, message: "Please select a role!" }]}>
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="User">User</Option>
              <Option value="Vendor">Vendor</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Status" name="status" rules={[{ required: true, message: "Please select a status!" }]}>
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
              <Option value="Suspended">Suspended</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <div className="charts-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#f1f5f9" />
            <YAxis stroke="#f1f5f9" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" barSize={40} radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.name === "Admin" ? "#3b82f6" :   // Blue
                      entry.name === "User" ? "#10b981" :    // Green
                        entry.name === "Vendor" ? "#f59e0b" :  // Amber
                          entry.name === "Active" ? "#22c55e" :  // Bright Green
                            entry.name === "Inactive" ? "#ef4444" : // Red
                              "#a855f7"                              // Purple (Suspended)
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default User;
