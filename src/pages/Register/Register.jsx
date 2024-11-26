import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import users from "../../data/user"; // Assuming this is the file where users are stored

import "./Register.css";

function Register({ newUserReg, setNewUserReg }) {
  const navigate = useNavigate();

  const [generatedOtp, setGeneratedOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    otp: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleRegister = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      otp,
    } = formData;

    // Basic validation
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      setErrorMessage("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }
    if (!otp) {
      setErrorMessage("กรุณากรอกรหัส OTP");
      return;
    }
    if (otp !== generatedOtp) {
      setErrorMessage("รหัส OTP ไม่ถูกต้อง โปรดลองอีกครั้ง"); // "Invalid OTP. Please try again."
      return;
    }

    // Find the next userID
    const nextUserID = users.length ? users[users.length - 1].userID + 1 : 1;

    // Create a new user object
    const newUser = {
      userID: nextUserID,
      user: email.split("@")[0],
      pass: password,
      role: "user",
      token: "user",
      pic: [],
      informProfile: {
        name: `${firstName} ${lastName}`,
        email,
        birthdate: "", // Optional field
        countryCode: "+66", // Default to Thailand
        phoneNumber,
      },
      informDriver: {
        plateNumber: "",
        brand: "",
        details: "",
      },
      paymentMethods: [],
    };

    setNewUserReg(newUser);
    setErrorMessage("");

    // Redirect to the main
    navigate("/verify", { state: { newUserReg } });

    // Optionally reset the form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      otp: "",
    });
  };

  const sendOtp = () => {
    // Check if phone number is exactly 10 characters
    if (formData.phoneNumber.length !== 10) {
      setErrorMessage("กรุณากรอกเบอร์มือถือให้ครบ 10 หลัก"); // "Please enter a 10-digit phone number"
      return;
    }

    // Generate a random 4-digit OTP
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setErrorMessage(""); // Clear any previous error messages
    alert(`Your OTP is: ${newOtp}`); // Display OTP for now (replace with SMS in production)
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    // Allow only numeric input and limit to 10 characters
    if (/^\d*$/.test(value) && value.length <= 10) {
      handleChange(e);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Allow only numeric input and limit to 4 characters
    if (/^\d*$/.test(value) && value.length <= 4) {
      handleChange(e);
    }
  };

  return (
    <div className="register-container">
      <div style={{ padding: "20px", paddingBottom: "0px" }}>
        <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', gap: '10px', marginBottom: '20px', marginLeft: '1.5rem' }}>
          <Button variant="success" className='back-button d-flex' onClick={() => navigate("/")}>
            <span className='bi bi-caret-left-fill d-flex'></span>
          </Button>
          <h1 className='d-flex' style={{ textAlign: 'center', fontWeight: 'bold', marginLeft: '1.5rem', color: '#01c063' }}>สมัครสมาชิก</h1>
        </div>
      </div>

      <div className="register-input-container">
        <div className="input-container">
          <label className="title">ชื่อจริง</label>
          <input
            type="text"
            className="register-input-bar"
            placeholder="ชื่อจริง"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <label className="title">นามสกุล</label>
          <input
            type="text"
            className="register-input-bar"
            placeholder="นามสกุล"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <label className="title">อีเมล</label>
          <input
            type="email"
            className="register-input-bar"
            placeholder="อีเมล"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <label className="title">รหัสผ่าน</label>
          <input
            type="password"
            className="register-input-bar"
            placeholder="รหัสผ่าน"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <label className="title">ยินยันรหัสผ่าน</label>
          <input
            type="password"
            className="register-input-bar"
            placeholder="ยืนยันรหัสผ่าน"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <label className="title">เบอร์มือถือ</label>
          <input
            type="text"
            className="register-input-bar"
            placeholder="เบอร์มือถือ"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>

        <div className="input-container">
          <input
            type="text"
            className="register-input-bar-1"
            placeholder="รหัส OTP"
            name="otp"
            value={formData.otp}
            onChange={handleOtpChange}
          />{" "}
          <button className="send-otp text-white" onClick={sendOtp}>ส่งรหัส</button>
        </div>
      </div>

      <div className="submit-container">
        <button
          type="submit"
          className="bi bi-arrow-right submit-btn"
          onClick={handleRegister}
        ></button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Register;
