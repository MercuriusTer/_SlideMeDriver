import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import "./EvidenceSend.css";

function EvidenceSend({ setIsEvidenceOpen, isLastStage, setIsLastStage, updateOrders, currentShowOrder, setCurrentShowOrder }) {
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  // Handle image upload
  const handleImageUpload = (event, index = null) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages((prevImages) => {
        if (index !== null) {
          const updatedImages = [...prevImages];
          updatedImages[index] = imageUrl;
          return updatedImages;
        } else {
          return [...prevImages, imageUrl];
        }
      });
    }
  };

  // Handle image delete
  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="evidence-container">
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', gap: '10px', marginBottom: '20px', marginLeft: '1.5rem' }}>
          <Button variant="success" className='back-button d-flex' onClick={() => setIsEvidenceOpen(false)}>
            <span className='bi bi-caret-left-fill d-flex'></span>
          </Button>
        </div>

        <div className="evidence-input-container">
          <div style={{ textAlign: "left" }}>
            <label htmlFor="" className="title">ภาพหลักฐาน</label>
            <div className="pic-container">
              <div className="buttons-pic">
                {images.map((image, index) => (
                  <div key={index} className="image-preview" onClick={() => handleImageDelete(index)}>
                    <img src={image} alt={`Uploaded ${index + 1}`} className="preview-img" />
                    <div className="delete-overlay">
                      <span className="bi bi-trash-fill trash-icon"></span>
                    </div>
                  </div>
                ))}
                {images.length < 5 && (
                  <div className="image-upload">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e)}
                      style={{ display: "none" }}
                      id={`upload-button-new`}
                    />
                    <label htmlFor="upload-button-new" className="add">
                      เพิ่มภาพถ่าย <span className="bi bi-camera-fill"></span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="" className="title">รายละเอียด</label>
            <input
              className="evidence-input-bar"
              type="text"
              placeholder="รายละเอียดเพิ่มเติม"
            />
          </div>

          <div className="evidence-buttons-container">
            <button className="start-button" onClick={() => {
              if (isLastStage) {
                // Update the order status from 'current' to 'history'
                updateOrders(currentShowOrder.id, { status: "history" });

                // Clear currentShowOrder
                setCurrentShowOrder([]);

                // Navigate to the home page
                navigate("/");
              } else {
                setIsLastStage(true)
                setIsEvidenceOpen(false)
              }
            }}>{!isLastStage ? "อัพเดตสถานะ" : "จบงาน"}</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default EvidenceSend;
