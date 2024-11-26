import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import "./DriverIDVerification.css";

function DriverIDVerification({ setIsDriverIDVerifiOpen, setIsDoneDriverIDVerifi }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Image:", selectedImage);
    // ส่งข้อมูลภาพไปยัง API หรือจัดเก็บตามต้องการ
  };

  return (
    <div className="IdVerification-container">
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
            onClick={() => setIsIdVerifiOpen((false))}
          >
            <span className="bi bi-caret-left-fill d-flex"></span>
          </Button>
          <h2
            className="d-flex"
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginLeft: "1.5rem",
            }}
          >
            ยืนยันใบขับขี่
          </h2>
        </div>

        <div className="ID-label-container">

          <div className="ID-reccomend">
            กรุณาวางเอกสารให้อยู่ในกรอบที่กำหนด<br />ให้เห็นตัวอักษรและข้อมูลบนบัตรอย่างชัดเจน
          </div>

          <div className="input-container" style={{ textAlign: "center" }}>
            <form onSubmit={handleSubmit}>

              <div className="preview-container">
                {selectedImage ? (
                  <div className="image-wrapper">
                    <img src={selectedImage} alt="Selected" />
                    <button
                      className="delete-button"
                      onClick={() => setSelectedImage(null)}
                    >
                      ✖
                    </button>
                  </div>
                ) : (
                  <p>ยังไม่มีรูปภาพ</p>
                )}
              </div>


              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleCapture}
                id="cameraInput"
                style={{ display: "none" }}
                className="bg-success camInput"
              />
              <label htmlFor="cameraInput" className="id-camera-label">
                <span class="bi bi-camera-fill"></span> &nbsp;ถ่ายภาพ
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="uploadInput"
                style={{ display: "none" }}
                className="bg-success imgInput"
              />
              <label htmlFor="uploadInput" className="id-camera-label">
                <span class="bi bi-card-image"></span> &nbsp;เพิ่มรูป
              </label>

              <button className="id-submit" type="submit" onClick={() => {
                if (!selectedImage) {
                  setErrorMessage("กรุณาถ่ายภาพใบขับขี่ก่อน")
                  return
                }
                setErrorMessage('')
                setIsDoneDriverIDVerifi(true)
                setIsDriverIDVerifiOpen(false)
              }}>
                ยืนยัน
              </button>

              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverIDVerification;
