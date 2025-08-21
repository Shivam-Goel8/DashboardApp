import React from "react";
import "./dashboard.css";
import {
  FaBell,
  FaUserCircle,
  FaMoneyBillWave,
  FaUsers,
  FaShoppingCart,
  FaChartLine,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer
} from "recharts";

// Dummy Data
const lineData = [
  { name: "plane", us: 500, france: 300, japan: 100 },
  { name: "helicopter", us: 420, france: 260, japan: 80 },
  { name: "boat", us: 400, france: 310, japan: 40 },
  { name: "train", us: 410, france: 220, japan: 200 },
  { name: "subway", us: 330, france: 120, japan: 90 },
  { name: "bus", us: 500, france: 400, japan: 230 },
  { name: "car", us: 310, france: 120, japan: 100 },
  { name: "moto", us: 480, france: 400, japan: 250 },
  { name: "bicycle", us: 350, france: 360, japan: 280 },
  { name: "horse", us: 300, france: 280, japan: 10 },
  { name: "skateboard", us: 390, france: 330, japan: 40 },
  { name: "others", us: 400, france: 250, japan: 20 },
];

const pieData = [
  { name: "Extra Costs", value: 25 },
  { name: "Revenue", value: 75 },
];

const COLORS = ["#6366f1", "#22c55e"];

const barData = [
  { name: "AD", donut: 120, fries: 90, kebab: 60, sandwich: 80, burger: 70, hotdog: 50 },
  { name: "AE", donut: 60, fries: 40, kebab: 30, sandwich: 35, burger: 20, hotdog: 25 },
  { name: "AF", donut: 150, fries: 100, kebab: 80, sandwich: 90, burger: 60, hotdog: 50 },
  { name: "AG", donut: 200, fries: 120, kebab: 70, sandwich: 100, burger: 80, hotdog: 60 },
  { name: "AI", donut: 180, fries: 110, kebab: 90, sandwich: 100, burger: 70, hotdog: 60 },
  { name: "AL", donut: 220, fries: 130, kebab: 100, sandwich: 120, burger: 90, hotdog: 80 },
  { name: "AM", donut: 200, fries: 120, kebab: 90, sandwich: 100, burger: 80, hotdog: 70 },
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Header / Navbar */}
      <header className="navbar">
        <div className="logo">MyDashboard</div>

        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-bar" />
        </div>

        <div className="nav-right">
          <div className="notification">
            <FaBell />
          </div>
          <div className="profile">
            <FaUserCircle className="profile-icon" />
            <span className="username">Shivam</span>
          </div>
        </div>
      </header>

      {/* Top Summary Cards */}
      <section className="cards-container">
        <div className="card">
          <FaChartLine className="card-icon sales" />
          <h3>Total Sales</h3>
          <p>₹ 1,20,000</p>
        </div>
        <div className="card">
          <FaMoneyBillWave className="card-icon revenue" />
          <h3>Revenue / Profit</h3>
          <p>₹ 80,000</p>
        </div>
        <div className="card">
          <FaUsers className="card-icon customers" />
          <h3>New Customers</h3>
          <p>320</p>
        </div>
        <div className="card">
          <FaShoppingCart className="card-icon orders" />
          <h3>Pending Orders</h3>
          <p>45</p>
        </div>
      </section>

      {/* Charts Section */}
      <section className="charts-container">
        {/* Line Chart */}
        <div className="chart-box">
          <h3>Revenue Generated</h3>
          <LineChart width={600} height={300} data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#f1f5f9" />
            <YAxis stroke="#f1f5f9" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="us" stroke="#f87171" strokeWidth={2} dot />
            <Line type="monotone" dataKey="france" stroke="#60a5fa" strokeWidth={2} dot />
            <Line type="monotone" dataKey="japan" stroke="#34d399" strokeWidth={2} dot />
          </LineChart>
        </div>

        {/* Pie Chart */}
        <div className="chart-box pie-box">
          <h3>Campaign</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <h2 className="pie-revenue">$48,352 revenue generated</h2>
          <p className="pie-subtext">Includes extra misc expenditures and costs</p>
        </div>

        {/* Bar Chart */}
        <div className="chart-box">
          <h3>Sales Quantity</h3>
          <BarChart width={500} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#f1f5f9" />
            <YAxis stroke="#f1f5f9" />
            <Tooltip />
            <Legend />
            <Bar dataKey="donut" stackId="a" fill="#67e8f9" />
            <Bar dataKey="fries" stackId="a" fill="#38bdf8" />
            <Bar dataKey="kebab" stackId="a" fill="#facc15" />
            <Bar dataKey="sandwich" stackId="a" fill="#fb923c" />
            <Bar dataKey="burger" stackId="a" fill="#ef4444" />
            <Bar dataKey="hotdog" stackId="a" fill="#a855f7" />
          </BarChart>
        </div>

        <div class="profit-card">
          <div class="profit-header">
            <div class="profit-icon-title">
              <div class="profit-icon">💰</div>
              <h3>Profit</h3>
            </div>
            <div class="profit-menu">⋮</div>
          </div>

          <div class="profit-illustration">
            {/* <!-- Replace this with your own image --> */}
            <img src="https://cdn-icons-png.flaticon.com/512/2620/2620465.png" alt="Profit" />
          </div>

          <div class="profit-footer">
            <p class="profit-growth">+14% <span>Since last week</span></p>
            <h2>$12,895.5</h2>
          </div>
        </div>
      </section>
      <div className="custom-orders-table">
        <h3 className="custom-table-title">Recent Orders</h3>
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
              <td>$250</td>
              <td className="status-completed">Completed</td>
            </tr>
            <tr>
              <td>#1024</td>
              <td>Jane Smith</td>
              <td>$480</td>
              <td className="status-pending">Pending</td>
            </tr>
            <tr>
              <td>#1021</td>
              <td>Rahul Sharma</td>
              <td>$450</td>
              <td className="status-completed">Completed</td>
            </tr>
            <tr>
              <td>#1022</td>
              <td>Ananya Gupta</td>
              <td>$280</td>
              <td className="status-pending">Pending</td>
            </tr>
            <tr>
              <td>#1023</td>
              <td>Amit Verma</td>
              <td>$520</td>
              <td className="status-completed">Completed</td>
            </tr>
            <tr>
              <td>#1024</td>
              <td>Priya Singh</td>
              <td>$150</td>
              <td className="status-pending">Pending</td>
            </tr>
            <tr>
              <td>#1025</td>
              <td>Robert Brown</td>
              <td>$320</td>
              <td className="status-cancelled">Cancelled</td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>

  );
};

export default Dashboard;
