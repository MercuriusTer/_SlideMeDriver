import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import IdVerification from "./IdVerification/IdVerification";
import DriverIDVerification from "./DriverIDVerification/DriverIDVerification"

import users from "../../data/user"; // Assuming this is the file where users are stored

import "./Verification.css";

function Verification({ onLogin, newUserReg, setNewUserReg }) {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    identifyCard: "",
    birthdate: "",
    personalAddress: "",
    currentAddress: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [isAddressSame, setIsAddressSame] = useState(false);

  // UseEffect to update currentAddress when isAddressSame is true
  useEffect(() => {
    if (isAddressSame) {
      setFormData((prev) => ({
        ...prev,
        currentAddress: prev.personalAddress,
      }));
    }
  }, [isAddressSame, formData.personalAddress]);

  // Handle checkbox toggle
  const handleAddressCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsAddressSame(isChecked);

    if (isChecked) {
      setFormData((prev) => ({
        ...prev,
        currentAddress: prev.personalAddress,
      }));
    }
  };

  // Handle form submission
  const handleRegister = () => {
    const { identifyCard, birthdate, personalAddress, currentAddress } = formData;

    if (!identifyCard || !birthdate || !personalAddress || !currentAddress) {
      setErrorMessage("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    if (identifyCard.length !== 13) {
      setErrorMessage("กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก");
      return;
    }

    if (!isDoneIDVerifi) {
      setErrorMessage("กรุณาถ่ายภาพยืนยันบัตรประชาชน");
      return;
    }

    if (!isDoneDriverIDVerifi) {
      setErrorMessage("กรุณาถ่ายภาพยืนยันใบขับขี่");
      return;
    }

    setNewUserReg((prevState) => {
      console.log("Previous state:", prevState);
      const updatedState = {
        ...prevState,
        informProfile: {
          ...prevState.informProfile,
          birthdate: birthdate,
        },
      };
      console.log("Updated state:", updatedState);
      return updatedState;
    });
  };

  useEffect(() => {
    if (isDoneIDVerifi && isDoneDriverIDVerifi) {
      users.push(newUserReg);
      console.log("New User Added:", newUserReg);

      alert("ลงทะเบียนสำเร็จ!");

      onLogin(newUserReg);
      setErrorMessage("");

      navigate("/");
    }
  }, [newUserReg]);

  const handleIdentifyCardChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 13) {
      handleChange(e);
    }
  };

  const [isIdVerifiOpen, setIsIdVerifiOpen] = useState(false);
  const [isDoneIDVerifi, setIsDoneIDVerifi] = useState(false);

  const [isDriverIDVerifiOpen, setIsDriverIDVerifiOpen] = useState(false);
  const [isDoneDriverIDVerifi, setIsDoneDriverIDVerifi] = useState(false);

  if (isIdVerifiOpen) {
    return <IdVerification setIsIdVerifiOpen={setIsIdVerifiOpen} setIsDoneIDVerifi={setIsDoneIDVerifi} />;
  }

  if (isDriverIDVerifiOpen) {
    return <DriverIDVerification setIsDriverIDVerifiOpen={setIsDriverIDVerifiOpen} setIsDoneDriverIDVerifi={setIsDoneDriverIDVerifi} />;
  }

  return (
    <div className="register-container">
      <div style={{ padding: "20px", paddingBottom: "0px" }}>
        <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', gap: '10px', marginBottom: '20px', marginLeft: '1.5rem' }}>
          <Button variant="success" className='back-button d-flex' onClick={() => navigate("/")}>
            <span className='bi bi-caret-left-fill d-flex'></span>
          </Button>
          <h1 className='d-flex' style={{ textAlign: 'center', fontWeight: 'bold', marginLeft: '1.5rem', color: '#01c063' }}>ยืนยันตัวตน</h1>
        </div>
      </div>
      <div className="register-input-container">
        <div className="input-container">
          <label className="title">เลขบัตรประชาชน</label>
          <input
            type="text"
            className="register-input-bar"
            placeholder="เลขบัตรประชาชน"
            name="identifyCard"
            value={formData.identifyCard}
            onChange={handleIdentifyCardChange}
          />
        </div>
      </div>

      <div className="register-input-container">
        <div className="input-container">
          <label className="title">วันเกิด</label>
          <input
            type="date"
            className="register-input-bar-bday"
            placeholder="วันเกิด"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="register-input-container">
        <div className="input-container">
          <label className="title">ที่อยู่ตามทะเบียนบ้าน</label>
          <input
            type="text"
            className="register-input-bar"
            placeholder="ที่อยู่ตามทะเบียนบ้าน"
            name="personalAddress"
            value={formData.personalAddress}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="register-input-container">
        <div className="input-container">
          <label className="title">ที่อยู่ปัจจุบัน</label>
          <input
            type="text"
            className="register-input-bar"
            placeholder="ที่อยู่ปัจจุบัน"
            name="currentAddress"
            value={formData.currentAddress}
            onChange={handleChange}
            disabled={isAddressSame}
          />
        </div>

        <div className="input-container">
          <label className="title">
            <input
              type="checkbox"
              className="register-checkbox"
              checked={isAddressSame}
              onChange={handleAddressCheckboxChange}
            />{" "}
            ใช้ที่อยู่ตามทะเบียนบ้าน
          </label>
        </div>
      </div>

      <div className="register-input-container">
        <button
          className={!isDoneIDVerifi ? "start-button" : "start-button-disabled"}
          name="cardID"
          onClick={() => setIsIdVerifiOpen(true)}
          disabled={isDoneIDVerifi}
        >
          ถ่ายรูปยืนยันบัตรประชาชน
        </button>
      </div>

      <div className="register-input-container">
        <button
          className={!isDoneDriverIDVerifi ? "start-button" : "start-button-disabled"}
          name="driverID"
          onClick={() => setIsDriverIDVerifiOpen(true)}
          disabled={isDoneDriverIDVerifi}
        >
          ถ่ายรูปยืนยันใบขับขี่
        </button>
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

export default Verification;
