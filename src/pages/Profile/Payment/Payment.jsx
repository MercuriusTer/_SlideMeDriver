import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import "./Payment.css";

function Payment({ paymentMethods, setPaymentMethods }) {
  const navigate = useNavigate();

  const [newBank, setNewBank] = useState({ bankFin: "กรุงไทย", bankName: "", accountNumber: "" });
  const [bankError, setBankError] = useState("");

  const handleAddBank = () => {
    if (newBank.accountNumber.trim() === "" || newBank.bankFin.trim() === "") {
      setBankError("กรุณาเลือกธนาคารและหมายเลขบัญชีให้ครบถ้วน");
      return;
    }

    const newPayment = {
      id: paymentMethods.length + 1,
      name: newBank.bankFin,
      type: newBank.bankName,
      details: newBank.accountNumber,
      isDefault: false,
    };

    setPaymentMethods([...paymentMethods, newPayment]);
    setNewBank({ bankFin: "กรุงไทย", accountNumber: "" });
    setBankError("");
  };

  const handleSetDefault = (id) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const thaiBanks = [
    "กรุงเทพ",
    "กสิกรไทย",
    "กรุงไทย",
    "ไทยพาณิชย์",
    "ทหารไทยธนชาต (TTB)",
    "ธนชาต",
    "ธนาคารออมสิน",
    "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร (ธ.ก.ส.)",
    "ธนาคารอาคารสงเคราะห์ (ธอส.)",
    "ยูโอบี",
    "ซีไอเอ็มบี ไทย",
    "ธนาคารไอซีบีซี (ไทย)",
    "ธนาคารแลนด์แอนด์เฮ้าส์",
    "ธนาคารทิสโก้",
    "ธนาคารเกียรตินาคินภัทร",
    "ธนาคารพัฒนาวิสาหกิจขนาดกลางและขนาดย่อมแห่งประเทศไทย (ธพว.)",
  ];

  return (
    <div className="Payment-container">
      <div style={{ paddingTop: "20px", paddingLeft: "20px", paddingRight: "20px" }}>
        <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', gap: '10px', marginLeft: '1.5rem' }}>
          <Button variant="success" className='back-button d-flex' onClick={() => navigate("/profile/")}>
            <span className='bi bi-caret-left-fill d-flex'></span>
          </Button>
        </div>
      </div>

      <div className="payment-methods">
        <h2 style={{ marginTop: "20px" }}>บัญชี</h2>

        {paymentMethods.map((method) => (
          <div key={method.id} className="payment-label" onClick={() => handleSetDefault(method.id)}>
            <div>
              <strong>{method.type}</strong><br></br>
              {method.details ? `${method.name}` : ""}
            </div>
            {method.isDefault &&
              <span
                style={{
                  backgroundColor: "#01C063",
                  textAlign: "center",
                  padding: "0.2rem",
                  color: "white",
                  border: "none",
                  borderRadius: "40px",
                  width: "65px",
                  height: "25px",
                }}
                onClick={() => handleSetDefault(method.id)}
              >
                Default
              </span>}
          </div>
        ))}

        <h2 style={{ marginTop: "20px" }}>เพิ่มบัญชี</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <select
            value={newBank.bankFin}
            onChange={(e) => setNewBank({ ...newBank, bankFin: e.target.value })}
            className="payment-input-bar"
          >
            {thaiBanks.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
          <input type="text" placeholder="ชื่อธนาคาร" value={newBank.bankName} onChange={(e) => setNewBank({ ...newBank, bankName: e.target.value })} className="payment-input-bar" />
          <input
            type="text"
            placeholder="เลขบัญชี"
            value={newBank.accountNumber}
            onChange={(e) => setNewBank({ ...newBank, accountNumber: e.target.value })}
            className="payment-input-bar"
            maxLength={10}
          />
          {bankError && <div style={{ color: "red" }}>{bankError}</div>}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={handleAddBank}
              className="payment-start-button"
            >
              เพิ่มบัญชี
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Payment;
