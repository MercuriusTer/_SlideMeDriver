import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import userData from '../../data/user'; // Import user data
import "./EditSlideCar.css";

function EditSlideCar({ username }) {
  // Assume logged-in user (e.g., 'user')
  const loggedInUser = userData.find(user => user.user === username); // Replace 'user' with dynamic login if needed

  // Initialize state with placeholder data and images
  const [images, setImages] = useState(loggedInUser.pic || []);
  const [plateNumber, setPlateNumber] = useState(loggedInUser.informDriver.plateNumber);
  const [brand, setBrand] = useState(loggedInUser.informDriver.brand);
  const [details, setDetails] = useState(loggedInUser.informDriver.details);

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

  // Save updated data to userData
  const handleSave = () => {
    const userIndex = userData.findIndex(user => user.user === username); // Find logged-in user's index
    if (userIndex !== -1) {
      userData[userIndex] = {
        ...userData[userIndex],
        pic: images,
        informDriver: {
          plateNumber,
          brand,
          details
        }
      };
      console.log('Data saved successfully:', userData[userIndex]); // Debugging
    } else {
      console.error('User not found in data.');
    }
  };

  return (
    <div className="page-container">
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', gap: '10px', marginBottom: '20px', marginLeft: '1.5rem' }}>
          <Link to="/">
            <Button variant="success" className='back-button d-flex'>
              <span className='bi bi-caret-left-fill d-flex'></span>
            </Button>
          </Link>
        </div>

        <div className="input-container">
          {/* Editable input fields with initial informDriver */}
          <div style={{ textAlign: "left" }}>
            <label htmlFor="" className="title">เลขทะเบียนรถ</label>
            <input
              className="input-bar"
              type="text"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              placeholder="เลขทะเบียนรถ"
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <label htmlFor="" className="title">ยี่ห้อรถสไลด์</label>
            <input
              className="input-bar"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="ยี่ห้อรถสไลด์"
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <label htmlFor="" className="title">ภาพถ่ายรถสไลด์</label>
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

          <div style={{ textAlign: "left" }}>
            <label htmlFor="" className="title">รายละเอียดเพิ่มเติม</label>
            <input
              className="input-bar"
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="รายละเอียดเพิ่มเติม"
            />
          </div>

          <div className='buttons-container'>
            <Link to="/">
              <button className='edit-save-button' onClick={handleSave}>
                บันทึก
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditSlideCar;
