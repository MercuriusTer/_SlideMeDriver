import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./EditProfile.css";

function EditProfile({ profileData, setProfileData, username }) {
  const navigate = useNavigate();

  // Initial state for inputs (use user data or fallback to empty/default values)
  const [formData, setFormData] = useState(profileData);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/[^\d]/g, "");

    // Apply formatting (for example: 0812345678 -> 081-24-5678)
    if (phoneNumber.length < 3) return phoneNumber;
    if (phoneNumber.length < 6) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  // Handle phone number change with formatting
  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatPhoneNumber(value);
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: formattedValue.replace(/-/g, ""), // Store raw phone number without hyphens
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
    setProfileData(formData);
  };

  return (
    <div className="EditProfile-container">
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
            gap: "10px",
            marginBottom: "20px",
            marginLeft: "1.5rem",
          }}
        >
          <Button
            variant="success"
            className="back-button d-flex"
            onClick={() => navigate("/profile")}
          >
            <span className="bi bi-caret-left-fill d-flex"></span>
          </Button>
          <h2
            className="d-flex"
            style={{ textAlign: "center", fontWeight: "bold", marginLeft: "1.5rem" }}
          >
            แก้ไขโปรไฟล์
          </h2>
        </div>

        <div className="profile-input-container" style={{ textAlign: "center" }}>
          <label htmlFor="" className="profile-label"></label>
          <span className="title">{username}</span>
          <span className="title" style={{ fontWeight: "normal" }}>
            เกี่ยวกับคุณ
          </span>

          <input
            type="text"
            name="name"
            className="input"
            placeholder="ชื่อ-นามสกุล"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            className="input"
            placeholder="อีเมล"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="birthdate"
            className="input"
            value={formData.birthdate}
            onChange={handleInputChange}
          />

          <div className="phone-container">
            <select
              name="countryCode"
              className="select"
              value={formData.countryCode}
              onChange={handleInputChange}
            >
              <option value="">+00</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+66">+66</option>
              <option value="+91">+91</option>
              <option value="+81">+81</option>
              {/* Add more countries as needed */}
            </select>
            <input
              type="text"
              name="phoneNumber"
              className="input-phone"
              placeholder="000-000-0000"
              value={formatPhoneNumber(formData.phoneNumber)} // Display formatted phone number
              onChange={handlePhoneNumberChange}
            />
          </div>

          <div className="buttons-container">
            <button className="start-button" onClick={handleSubmit}>
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
