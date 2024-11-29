import React, { useState } from "react";
import { useNavigate } from "react-router";

import users from "../../data/user"; // Adjust path if necessary

import "./Login.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import Logo from '../../assets/logo.png';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    // Allow only numeric input and limit to 10 characters
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Allow only numeric input and limit to 4 characters
    if (/^\d*$/.test(value) && value.length <= 4) {
      setOtp(value);
    }
  };

  const sendOtp = () => {
    // Check if phone number is exactly 10 characters
    if (phoneNumber.length !== 10) {
      setErrorMessage("กรุณากรอกเบอร์มือถือให้ครบ 10 หลัก"); // "Please enter a 10-digit phone number"
      return;
    }

    // Generate a random 4-digit OTP
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setErrorMessage(""); // Clear any previous error messages
    alert(`Your OTP is: ${newOtp}`); // Display OTP for now (replace with SMS in production)
  };

  // Login Google as login immedially to the app by user userID: 1
  const handleLoginGoogle = () => {
    const user = users.find((u) => u.userID === 1);
    onLogin(user);
    alert(`ยินดีต้อนรับ ${user.informProfile.name}!`); // "Welcome"
  };

  const handleLogin = () => {
    // Check if phone number exists in users and OTP matches
    const user = users.find((u) => u.informProfile.phoneNumber === phoneNumber);

    if (!user) {
      setErrorMessage("ไม่พบหมายเลขโทรศัพท์ในระบบ"); // "Invalid phone number"
      return;
    }

    if (otp !== generatedOtp) {
      setErrorMessage("รหัส OTP ไม่ถูกต้อง โปรดลองอีกครั้ง"); // "Invalid OTP. Please try again."
      return;
    }

    setErrorMessage(""); // Clear any previous error messages
    onLogin(user);
    alert(`ยินดีต้อนรับ ${user.informProfile.name}!`); // "Welcome"
  };

  // Nagivate to register page
  const handleRegister = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <div className="header">
        <img src={Logo} alt="App Logo" className="login-logo" />
      </div>

      <div className="login-input-container">
        <input
          type="text"
          className="login-input"
          placeholder="เบอร์มือถือ"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>

      <div className="login-input-container">
        <input
          type="text"
          className="login-input-1"
          placeholder="รหัส OTP"
          value={otp}
          onChange={handleOtpChange}
        />
        <button className="send-otp" onClick={sendOtp}>
          ส่งรหัส
        </button>
      </div>

      <div className="submit-container">
        <button
          type="submit"
          className="bi bi-arrow-right submit-btn"
          onClick={handleLogin}
        ></button>
      </div>

      {/* Error message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="divider">
        <span>----------------------or-----------------------</span>
      </div>

      <div className="social-login">
        <button className="social-btn google" onClick={handleLoginGoogle}>
          <i className="bi bi-google"></i>
        </button>
        <button className="social-btn facebook">
          <i className="bi bi-facebook"></i>
        </button>
        <button className="social-btn apple">
          <i className="bi bi-apple"></i>
        </button>
      </div>

      <footer className="footer">
        <h3>
          ยังไม่มีบัญชี?{" "}
          <span className="signup-link" onClick={handleRegister}>
            สมัครสมาชิก
          </span>
        </h3>
      </footer>
    </div>
  );
};

export default Login;
