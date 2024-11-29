import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./OfferChoice.css";

import car1 from "../../assets/driver-pic/car1.jpg";
import car2 from "../../assets/driver-pic/car2.jpg";
import car3 from "../../assets/driver-pic/car3.jpg";

function OfferChoice({ saveLocation, setCurrentShowOrder, addOrders }) {
    const [activeTab, setActiveTab] = useState("details");

    const location = useLocation();
    const navigate = useNavigate();

    const [locationDetails, setLocationDetails] = useState([]);
    const [sentBackDetails, setsentBackDetails] = useState([]);

    const [driverOffers, setDriverOffers] = useState([
        {
            id: 1,
            name: "วิชัย ทรงธรรม",
            date: '29 Aug 2024 - 14:30',
            status: 'scheduled',
            address1: 'ถนนพหลโยธิน, แขวงอนุสาวรีย์, เขตบางเขน, กรุงเทพมหานคร, 10010, ประเทศไทย',
            address2: 'มหาวิทยาลัยศรีปทุม, 2410/2, ถนนพหลโยธิน, แขวงลาดยาว, เขตจตุจักร, กรุงเทพมหานคร, 10900, ประเทศไทย',
            carType: 'Sedan',
            moreDetail: 'รถคันนี้สีแดง',
            selected: false,
            pic: car1
        },
        {
            id: 2,
            name: "ณัฐวุฒิ รุ่งเรืองกิจ",
            date: '30 Aug 2024 - 09:00',
            status: 'current',
            address1: 'ศูนย์เกษตรรวมใจ 2, ถนนทวีศักดิ์เสสะเวศ, แขวงลาดยาว, เขตจตุจักร, กรุงเทพมหานคร, 10900, ประเทศไทย',
            address2: 'ถนนพหลโยธิน, แขวงอนุสาวรีย์, เขตบางเขน, กรุงเทพมหานคร, 10010, ประเทศไทย',
            carType: 'Truck',
            moreDetail: 'รถคันนี้สีดำ',
            selected: false,
            pic: car2
        },
        {
            id: 3,
            name: "พัชรพล แสงมณี",
            date: '31 Aug 2024 - 16:45',
            status: 'current',
            address1: 'ซอยพหลโยธิน 49/1, แขวงตลาดบางเขน, เขตหลักสี่, กรุงเทพมหานคร, 10210, ประเทศไทย',
            address2: 'ซอยวิภาวดีรังสิต 60 แยก 3-9, แขวงตลาดบางเขน, เขตหลักสี่, กรุงเทพมหานคร, 10210, ประเทศไทย',
            carType: 'SUV',
            moreDetail: 'รถคันนี้สีฟ้า',
            selected: true,
            pic: car3
        },
    ]);

    useEffect(() => {
        // Find the driver offer where `selected` is true
        const selectedOffer = driverOffers.find((offer) => offer.selected);

        if (selectedOffer) {
            setLocationDetails({
                name: selectedOffer.name,
                address1: selectedOffer.address1,
                address2: selectedOffer.address2,
                carType: selectedOffer.carType,
                callType: selectedOffer.status,
                moreDetail: selectedOffer.moreDetail
            });
        }
    }, [driverOffers]);

    // Function to handle selecting an offer
    const handleSelectOffer = (offer) => {
        setDriverOffers(prevOffers =>
            prevOffers.map(o =>
                o.id === offer.id ? { ...o, selected: true } : { ...o, selected: false }
            )
        );
    };

    const [map, setMap] = useState(null);

    useEffect(() => {
        const [lat, lng] = saveLocation.coordinates || [13.8556296, 100.5854846];

        // Check if the map is already initialized
        if (map) {
            map.remove(); // Remove the old map instance
        }

        // Create a new map instance
        const newMap = L.map("map", {
            center: [lat, lng],
            zoom: 14,
            zoomControl: false, // Disable zoom buttons
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(newMap);

        // Add marker at the center location
        L.marker([lat, lng]).addTo(newMap);

        // Add a circle with a 1000m radius around the marker
        L.circle([lat, lng], {
            color: "transparent", // No border
            fillColor: "yellow",  // Circle fill color
            fillOpacity: 0.2,     // Circle fill opacity
            radius: 1000,         // 1000 meters radius
        }).addTo(newMap);

        // Car marker icons and positions
        const carIcon = new L.Icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/75/75800.png', // Path to your car icon
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
        });

        const carPositions = [
            { lat: lat + 0.0042, lng: lng + 0.0042 },  // Car 1
            { lat: lat - 0.0042, lng: lng - 0.0042 },  // Car 2
            { lat: lat + 0.0042, lng: lng - 0.0042 },  // Car 3
        ];

        carPositions.forEach((position, index) => {
            const carMarker = L.marker([position.lat, position.lng], { icon: carIcon })
                .addTo(newMap)
                .on('click', () => handleSelectOffer(driverOffers[index])); // Click car to select offer
        });

        setMap(newMap); // Save the map instance for future updates

        // Cleanup to prevent reinitialization
        return () => {
            if (newMap) {
                newMap.remove();
            }
        };
    }, [saveLocation]);

    const [status, setStatus] = useState("รอให้คุณเสนอราคา");
    const [offer, setOffer] = useState(""); // Raw numeric value

    // const handleOfferChange = (e) => {
    //     const value = e.target.value.replace(/[^0-9]/g, ""); // Strip non-numeric characters
    //     setOffer(value); // Store only the raw numeric value
    // };

    const formatCurrency = (value) => {
        if (!value) return ""; // Handle empty input
        const formatter = new Intl.NumberFormat("th-TH", {
            style: "decimal", // Format as a plain number
            minimumFractionDigits: 0,
        });
        return formatter.format(value); // Add commas for thousands
    };

    const [showModal, setShowModal] = useState(false); // State for modal visibility

    const handleOfferSubmit = () => {
        if (offer) {
            setStatus("รอการตอบรับจากลูกค้า");
        } else {
            alert("กรุณากรอกจำนวนเงิน");
        }
    };

    // Function to handle modal visibility
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (status === "รอการตอบรับจากลูกค้า") {

                const currentDate = new Date();
                const formattedDate = currentDate.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                }) +
                    ' - ' +
                    currentDate.toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false, // Use 24-hour time format
                    });

                const newOrder = {
                    name: locationDetails.name,
                    date: formattedDate, // Store formatted date
                    amount: offer,
                    status: 'current',
                    address1: locationDetails.address1,
                    address2: locationDetails.address2,
                    carType: locationDetails.carType,
                    moreDetail: locationDetails.moreDetail
                };
                addOrders(newOrder);

                setCurrentShowOrder(newOrder);

                navigate('/list/process-working');
            }
        }, 10000);

        return () => clearTimeout(timer);
    }, [status]);

    return (
        <div className="offer-container">
            <div style={{ padding: "10px" }}>
                {/* Back Button */}
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
                    <Button variant="success" className="back-button d-flex" onClick={() => navigate("/home/", { state: { sentBackDetails } })}>
                        <span className="bi bi-caret-left-fill d-flex"></span>
                    </Button>
                </div>

                {/* Map Section */}
                <div id="map" style={{ height: "350px", width: "100%" }}></div>
            </div>

            <div className="tab-container">
                {/* Tab Buttons */}
                <div className="tab-buttons">
                    <button
                        className={activeTab === "details" ? "active" : "unactive"}
                        onClick={() => setActiveTab("details")}
                    >
                        รายละเอียด
                    </button>
                    <button
                        className={activeTab === "offer" ? "active" : "unactive"}
                        onClick={() => setActiveTab("offer")}
                    >
                        Offer
                    </button>
                </div>

                {/* Content Section */}
                <div className="content-section">
                    {activeTab === "details" ? (
                        <div className="details-container">
                            <h3 style={{ display: 'flex', }}>
                                <span className="bi bi-geo-alt-fill" style={{ color: "red", marginRight: '8px' }}></span>
                                <span>{locationDetails.address1}</span>
                            </h3>
                            <h3 style={{ display: 'flex', }}>
                                <span className="bi bi-geo-alt-fill" style={{ color: "#01c063", marginRight: '8px' }}></span>
                                <span>{locationDetails.address2}</span>
                            </h3>
                            <h3>
                                <b>ชื่อลูกค้า:</b> &nbsp;
                                {locationDetails.name}
                            </h3>
                            <h3>
                                <b>ประเภทรถ:</b> &nbsp;
                                {locationDetails.carType}
                            </h3>
                            <h3>
                                <b>ประเภทการเรียกรถ:</b> &nbsp;
                                {locationDetails.callType === "scheduled" ? "เรียกล่วงหน้า" : "เรียกทันที"}
                            </h3>

                            <h3 onClick={() => handleShowModal()} className="more-details">
                                ดูรายละเอียดเพิ่มเติม &gt;&gt;
                            </h3>
                        </div>
                    ) : (
                        <div>
                            <div className="details-container">
                                <div className="offer-item">
                                    <div className="offer-title">
                                        <h3><b>เสนอราคา</b></h3>
                                    </div>
                                    <input
                                        type="text"
                                        id="offer-input"
                                        className="offer-input"
                                        placeholder="กรอกจำนวนเงิน"
                                        value={
                                            status !== "รอให้คุณเสนอราคา"
                                                ? `${formatCurrency(offer)}฿` // Add ฿ only when disabled
                                                : offer // Show raw numeric input when editable
                                        }
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/[^0-9]/g, ""); // Strip non-numeric characters
                                            setOffer(value); // Store raw numeric value
                                        }}
                                        disabled={status !== "รอให้คุณเสนอราคา"} // Control editable state
                                    />

                                    {status !== "รอการตอบรับจากลูกค้า" && (
                                        <button className="offer-button" onClick={handleOfferSubmit} disabled={status !== "รอให้คุณเสนอราคา"}>
                                            เสนอราคา
                                        </button>
                                    )}

                                </div>

                                <h3 style={{ marginTop: '2rem' }}><b>สถานะ: </b>
                                    <span style={{ color: '#FFBF00' }}>{status}</span>
                                </h3>
                            </div>
                        </div>
                    )}

                    {/* Modal for More Details */}
                    <Modal show={showModal} onHide={handleCloseModal} centered>
                        <Modal.Body>
                            <div className="modal-contrainer">
                                <Modal.Title clas>รายละเอียดเพิ่มเติม</Modal.Title>

                                <img
                                    src={
                                        locationDetails.name === "วิชัย ทรงธรรม" ? car1 :
                                            locationDetails.name === "ณัฐวุฒิ รุ่งเรืองกิจ" ? car2 :
                                                locationDetails.name === "พัชรพล แสงมณี" ? car3 :
                                                    "car3.jpg"
                                    }
                                    alt={locationDetails.name}
                                />
                                <div className="more-details-modal">
                                    <h3>{locationDetails.moreDetail}</h3>
                                </div>
                                <Button variant="success" onClick={handleCloseModal}>
                                    ปิด
                                </Button>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default OfferChoice;
