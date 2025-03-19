import { useState } from "react";
import "./style.css"; // Import the CSS file for styling

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    option: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className="login-container">
      <h2 className="login">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <span className="icon">📧</span>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <span className="icon">🔒</span>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <span className="icon">✔️</span>
          <select name="option" required value={formData.option} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="option1">With Google</option>
            <option value="option2">New account</option>
          </select>
        </div>
        <button type="submit" className="sign-in-btn">SIGN IN</button>
      </form>
      <p className="forgot-password">FORGOT PASSWORD</p>
      <div className="divider">or</div>
      <button className="social-btn twitter">Continue with Twitter</button>
      <button className="social-btn facebook">Continue with Facebook</button>
    </div>
  );
};

export default Login;
