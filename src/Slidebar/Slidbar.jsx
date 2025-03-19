import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../style.css"; // Make sure the path is correct

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation(); // Get current route

  // Toggle Sidebar on Button Click
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {/* Hamburger Button (appears when the sidebar is collapsed) */}
      <div className="slider-button" onClick={toggleSidebar}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isExpanded ? "expanded" : ""}`}>
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="sidebar-menu">
          <li>
            <Link
              to="/"
              onClick={toggleSidebar}
              className={location.pathname === "/" ? "active" : ""}
            >
              🏠 Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/order"
              onClick={toggleSidebar}
              className={location.pathname === "/order" ? "active" : ""}
            >
              📦 Orders
            </Link>
          </li>
          <li>
            <Link
              to="/product"
              onClick={toggleSidebar}
              className={location.pathname === "/product" ? "active" : ""}
            >
              🛍 Products
            </Link>
          </li>
          <li>
            <Link
              to="/user"
              onClick={toggleSidebar}
              className={location.pathname === "/user" ? "active" : ""}
            >
              👤 Users
            </Link>
          </li>
          <li>
            <Link
              to="/analytics"
              onClick={toggleSidebar}
              className={location.pathname === "/analytics" ? "active" : ""}
            >
              📊 Analytics
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              onClick={toggleSidebar}
              className={location.pathname === "/login" ? "active" : ""}
            >
              🔑 Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
