import React from "react";
import { FaShoppingCart, FaUsers, FaBox, FaChartLine } from "react-icons/fa";
import { Line, Bar, Pie } from "react-chartjs-2";
import './style.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from "chart.js";

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// Chart Data
const revenueData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Revenue (₹)",
      data: [500000, 800000, 750000, 1000000, 950000, 1100000, 1200000],
      fill: false,
      borderColor: "#feca57",
      tension: 0.1,
    },
  ],
};

const revenueOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Revenue Over the Last 7 Months",
    },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
};

const categoryData = {
  labels: ["Mobile", "Laptop", "Iphone", "Smartphone", "Toys"],
  datasets: [
    {
      data: [50, 20, 15, 10, 5],
      backgroundColor: ["#ff6b6b", "#1dd1a1", "#54a0ff", "#feca57", "#ff9ff3"],
      hoverOffset: 4,
    },
  ],
};

const categoryOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.label + ": " + tooltipItem.raw + "%";
        },
      },
    },
  },
};

const barChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Revenue (₹)",
      data: [500000, 800000, 750000, 1000000, 950000, 1100000, 1200000],
      backgroundColor: "#feca57",
      borderColor: "#feca57",
      borderWidth: 1,
    },
  ],
};

function DashboardCard({ icon, title, value, color }) {
  return (
    <div className="dashboard-card" style={{ borderLeft: `5px solid ${color}` }}>
      <div className="icon" style={{ color: color }}>{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      {/* Cards Section */}
      <div className="dashboard-cards">
        <DashboardCard icon={<FaShoppingCart />} title="Total Orders" value="1,250" color="#ff6b6b" />
        <DashboardCard icon={<FaUsers />} title="Total Customers" value="5,432" color="#1dd1a1" />
        <DashboardCard icon={<FaBox />} title="Products in Stock" value="321" color="#54a0ff" />
        <DashboardCard icon={<FaChartLine />} title="Monthly Revenue" value="₹12,23,340" color="#feca57" />
      </div>

      {/* Revenue Line Chart Section */}
      <div className="contain_graph">
        <div className="chart-sections">
          <h3>Monthly Revenue</h3>
          <div className="chart-container">
            <Line data={revenueData} options={revenueOptions} />
          </div>
        </div>
        <div className="balance-card">
          <div className="balan">
            <p>Your Balance</p>
            <p>In Rupees</p>
          </div>
          <hr />
          <div className="bal">Balance</div>
          <div className="bal_amount">₹12,45,900</div>
          <span className="bal_para">
            Compared to the last month <p>+25.17%</p>
          </span>
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7scYQ9jjZSMEXCkMRvGUM8_IvZYtU_QjXRA&s" alt="Balance Image" />
          </div>
        </div>
      </div>

      <div className="graph_con">
        {/* Product Category Distribution Pie Chart Section */}
        <div className="chart-section">
          <h3>Product Category Distribution</h3>
          <div className="chart-container">
            <Pie data={categoryData} options={categoryOptions} />
          </div>
        </div>

        {/* Revenue Comparison Bar Chart Section */}
        <div className="chart-section">
          <h3>Monthly Revenue Comparison</h3>
          <div className="chart-container">
            <Bar data={barChartData} options={revenueOptions} />
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1023</td>
              <td>John Doe</td>
              <td>₹2500</td>
              <td className="completed">Completed</td>
            </tr>
            <tr>
              <td>#1024</td>
              <td>Sarah Smith</td>
              <td>₹1800</td>
              <td className="pending">Pending</td>
            </tr>
            <tr>
              <td>#1025</td>
              <td>Jatin</td>
              <td>₹1800</td>
              <td className="completed">Completed</td>
            </tr>
            <tr>
              <td>#1026</td>
              <td>Jiya</td>
              <td>₹1800</td>
              <td className="pending">Pending</td>
            </tr>
            <tr>
              <td>#1027</td>
              <td>Ramesh</td>
              <td>₹1800</td>
              <td className="completed">Completed</td>
            </tr>
            <tr>
              <td>#1028</td>
              <td>Riya</td>
              <td>₹8800</td>
              <td className="completed">Completed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
