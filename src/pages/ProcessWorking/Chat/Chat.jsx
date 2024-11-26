import React, { useState } from "react";
import { Button } from "react-bootstrap";

import "./Chat.css";

function Chat({ setIsChatOpen, isLastStage }) {
  return (
    <div className="chat-container">
      <div className="top-bar">
        <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', gap: '10px', marginBottom: '10px', marginLeft: '1.5rem' }}>
          <Button variant="success" className='back-button d-flex' onClick={() => setIsChatOpen(false)}>
            <span className='bi bi-caret-left-fill d-flex'></span>
          </Button>
          <h2 className='d-flex' style={{ textAlign: 'center', fontWeight: 'bold', marginLeft: '1.5rem' }}>แชท</h2>
        </div>
      </div>

      <div className="chat-main-container">
        <div className="outgoing-message">
          <div className="bubble outgoing">สวัสดีครับ กำลังไปตามหมุดที่แจ้งไว้ นะครับ</div>
        </div>

        <div className="incoming-message">
          <div className="avatar">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="User Avatar"
              className="avatar-image"
            />
          </div>
          <div className="bubble incoming">ได้ครับผม รบกวนด้วยครับพี่ถึงแล้วช่วยอัพเดตโลมาด้วยครับ</div>
        </div>

        <div className="outgoing-message">
          <div className="bubble outgoing">ได้ครับนี่ภาพโลมา</div>
        </div>

        <div className="outgoing-message">
          <div className="bubble outgoing"><img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7s3Lw9vIOM0z6J3bvO2x4nxqT2ri9ZyNZkg&s"
            alt=""
            style={{ width: "150px", height: "150px", border: "2px solid #ffffff" }} /></div>
        </div>

        <div className="incoming-message">
          <div className="avatar">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="User Avatar"
              className="avatar-image"
            />
          </div>
          <div className="bubble incoming">เฮ้ออออ</div>
        </div>

        {!isLastStage && (
          <div className="incoming-message">
            <div className="avatar">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="User Avatar"
                className="avatar-image"
              />
            </div>
            <div className="bubble incoming">เฮ้ออออ</div>
          </div>)}
      </div>

      <div className="chat-input-container">
        <input type="text" className="chat-input-text" placeholder="Aa" />
        <button className="chat-send-button"><span className="bi bi-send"></span></button>
      </div>
    </div >
  );
}

export default Chat;
