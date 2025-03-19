import React, { useState } from "react";
import { Table, Input, Button, Select, Tag, Modal, Form, Card } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import "./style.css";

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
    { id: 11, name: "Deepika Rao", email: "deepika.rao@example.com", role: "User", status: "Active" },
    { id: 12, name: "Rohan Gupta", email: "rohan.gupta@example.com", role: "Admin", status: "Suspended" },
  ]);

  const [searchText, setSearchText] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState(null);

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  const handleRoleFilter = (value) => {
    setFilterRole(value);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

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
        setUsers(users.map((user) => (user.id === editingUser.id ? { ...user, ...values } : user)));
      } else {
        setUsers([...users, { id: users.length + 1, ...values }]);
      }
      setIsModalVisible(false);
    });
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
      onFilter: (value, record) => record.role === value
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : status === "Inactive" ? "volcano" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} className="edit-btn" onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} danger className="delete-btn" onClick={() => handleDelete(record.id)} />
        </>
      ),
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchText) || user.email.toLowerCase().includes(searchText);
    const matchesRole = filterRole ? user.role === filterRole : true;
    return matchesSearch && matchesRole;
  });

  // Define roleData and statusData for the charts
  const roleData = [
    { name: "Admin", count: users.filter(user => user.role === "Admin").length },
    { name: "User", count: users.filter(user => user.role === "User").length },
    { name: "Vendor", count: users.filter(user => user.role === "Vendor").length },
  ];

  const statusData = [
    { name: "Active", count: users.filter(user => user.status === "Active").length },
    { name: "Inactive", count: users.filter(user => user.status === "Inactive").length },
    { name: "Suspended", count: users.filter(user => user.status === "Suspended").length },
  ];

  return (
    <div className="user-management-container">
      <h2 className="title_user">User Management</h2>
      <div className="controls">
        <Search placeholder="Search Users" onSearch={handleSearch} className="search-bar" />
        <Select placeholder="Filter by Role" onChange={handleRoleFilter} className="filter-dropdown" allowClear>
          <Option value="Admin">Admin</Option>
          <Option value="User">User</Option>
          <Option value="Vendor">Vendor</Option>
        </Select>
        <Button type="primary" className="add-user-btn" icon={<PlusOutlined />} onClick={handleAddUser}>Add User</Button>
      </div>
      <Table dataSource={filteredUsers} columns={columns} rowKey="id" className="user-table" scroll={{ x: "max-content" }} />

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSaveUser}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter user name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter user email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="User">User</Option>
              <Option value="Vendor">Vendor</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select a status!" }]}
          >
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
              <Option value="Suspended">Suspended</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <div>
        <div className="charts-container">
          <Card className="chart-card" title="User Roles Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="chart-card" title="User Status Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>


  );
};

export default User;

