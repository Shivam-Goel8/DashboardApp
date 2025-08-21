import React, { useState } from "react";
import { Button, Input, List } from "antd";
import { DeleteOutlined, BellOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";
import "./setting.css";

export default function Settings() {
  const [notifications, setNotifications] = useState([
    "New message from Admin",
    "Your password will expire in 7 days",
    "Update available for your app",
  ]);


  const [loggedIn, setLoggedIn] = useState(false);

  const [profile] = useState({
    name: "Rahul Sharma",
    email: "rahul@example.com",
  });

  // delete notification
  const deleteNotification = (index) => {
    const newList = [...notifications];
    newList.splice(index, 1);
    setNotifications(newList);
  };

  return (
    <div className="settings-box">
      <h2>⚙️ Settings</h2>

      {/* Notifications Section */}
      <div className="setting-section">
        <h3><BellOutlined /> Notifications</h3>
        {notifications.length > 0 ? (
          <List
            bordered
            dataSource={notifications}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => deleteNotification(index)}
                  >
                    Delete
                  </Button>,
                ]}
              >
                {item}
              </List.Item>
            )}
          />
        ) : (
          <p>No notifications 🎉</p>
        )}
      </div>

      {/* Login Section */}
      <div className="setting-section">
        <h3><LoginOutlined /> Login</h3>
        {loggedIn ? (
          <p style={{ color: "lightgreen" }}>✅ You are logged in</p>
        ) : (
          <Button type="primary" onClick={() => setLoggedIn(true)}>
            Login
          </Button>
        )}
      </div>

      {/* Profile Section */}
      <div className="setting-section">
        <h3><UserOutlined /> Profile</h3>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
      </div>
    </div>
  );
}
