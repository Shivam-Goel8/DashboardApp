import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sliderbar.css";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const location = useLocation();

  // Check screen size on component mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      setShowHamburger(mobile);

      // Auto-collapse sidebar on mobile
      if (mobile) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Close sidebar when clicking on a link (mobile only)
  const handleLinkClick = () => {
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isExpanded && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* Hamburger menu - only visible on mobile */}
      {showHamburger && (
        <button
          className={`hamburger-btn ${isExpanded ? 'expanded' : ''}`}
          onClick={toggleSidebar}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"} ${isMobile ? "mobile" : ""}`}>
        <h2 className="sidebar-title">{isExpanded ? "Specta" : "S"}</h2>

        <ul className="sidebar-menu">
          <li>
            <Link
              to="/"
              className={location.pathname === "/" ? "active" : ""}
              onClick={handleLinkClick}
            >
              <span className="icon">🏠</span>
              {isExpanded && <span className="text">Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/order"
              className={location.pathname === "/order" ? "active" : ""}
              onClick={handleLinkClick}
            >
              <span className="icon">📦</span>
              {isExpanded && <span className="text">Orders</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/product"
              className={location.pathname === "/product" ? "active" : ""}
              onClick={handleLinkClick}
            >
              <span className="icon">🛍</span>
              {isExpanded && <span className="text">Products</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/customer"
              className={location.pathname === "/customer" ? "active" : ""}
              onClick={handleLinkClick}
            >
              <span className="icon">👤</span>
              {isExpanded && <span className="text">Customers</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/analytics"
              className={location.pathname === "/analytics" ? "active" : ""}
              onClick={handleLinkClick}
            >
              <span className="icon">📊</span>
              {isExpanded && <span className="text">Reports</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/setting"
              className={location.pathname === "/setting" ? "active" : ""}
              onClick={handleLinkClick}
            >
              <span className="icon">⚙️</span>
              {isExpanded && <span className="text">Setting</span>}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;