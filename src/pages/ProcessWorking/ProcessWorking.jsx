import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import L from "leaflet"; // Install leaflet: npm install leaflet

import Chat from "./Chat/Chat";
import Evidence from "./EvidenceSend/EvidenceSend";

import SlideLogo from "../../assets/slide-car-blue.png";

import "leaflet/dist/leaflet.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./ProcessWorking.css";

function ProcessWorking({ currentShowOrder, updateOrders, setCurrentShowOrder }) {
  const [progress, setProgress] = useState(0); // Initial progress value
  const [location1, setLocation1] = useState(null); // State for address1 coordinates
  const [location2, setLocation2] = useState(null); // State for address2 coordinates
  const mapRef = React.useRef(null); // Ref for the map
  const mapContainerRef = React.useRef(null); // Ref for the map container

  const [isChatOpen, setIsChatOpen] = useState(false); // State to track if chat is open
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false); // State to track if evidence is open
  const [isLastStage, setIsLastStage] = useState(false)

  // Fetch location from Nominatim API
  const fetchLocation = async (address, setLocation) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setLocation({ lat: parseFloat(lat), lon: parseFloat(lon) });
      } else {
        console.error("Location not found for", address);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  useEffect(() => {
    if (currentShowOrder?.address1) {
      fetchLocation(currentShowOrder.address1, setLocation1);
    }
    if (currentShowOrder?.address2) {
      fetchLocation(currentShowOrder.address2, setLocation2);
    }
  }, [currentShowOrder]);

  // Fetch route from OSRM (or another routing service) and draw the polyline
  const fetchRoute = async () => {
    if (location1 && location2) {
      const { lat: lat1, lon: lon1 } = location1;
      const { lat: lat2, lon: lon2 } = location2;

      const routeUrl = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?geometries=geojson&alternatives=false&steps=false`;

      try {
        const response = await fetch(routeUrl);
        const data = await response.json();
        const route = data.routes[0].geometry.coordinates;

        // Draw the polyline along the road
        if (mapRef.current) {
          const polyline = L.polyline(route.map(coord => [coord[1], coord[0]]), { color: "blue", weight: 5 }).addTo(mapRef.current);

          // After adding the polyline, adjust zoom level to fit both markers and the polyline
          const bounds = polyline.getBounds();
          mapRef.current.fitBounds(bounds); // Automatically adjust zoom and center map
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    }
  };

  // Initialize or re-initialize the map when locations change
  useEffect(() => {
    if (location1 && location2 && !isChatOpen && !isEvidenceOpen) {
      // Destroy the map instance if it already exists
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      // Calculate the midpoint between address1 and address2
      const midLat = (location1.lat + location2.lat) / 2;
      const midLon = (location1.lon + location2.lon) / 2;

      // Initialize the map with zoomControl and dragging set to false
      mapRef.current = L.map(mapContainerRef.current, {
        zoom: 14,
        zoomControl: false, // Disable zoom buttons
      }).setView([midLat, midLon], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Add markers for address1 and address2
      const marker1 = L.marker([location1.lat, location1.lon]).addTo(mapRef.current).bindPopup("Address 1");
      const marker2 = L.marker([location2.lat, location2.lon]).addTo(mapRef.current).bindPopup("Address 2");

      // Add a custom marker at the midpoint (center marker) - This stays on the line
      const centerIcon = L.icon({
        iconUrl: SlideLogo, // Use the URL for your logo
        iconSize: [40, 40], // Adjust the size of the marker
        iconAnchor: [16, 32], // Anchor the icon at the bottom
        popupAnchor: [0, -32], // Popup will appear above the icon
      });

      const centerMarker = L.marker([midLat, midLon], { icon: centerIcon }).addTo(mapRef.current).bindPopup("Pickup Location");

      // Fetch and draw the route
      fetchRoute();
    }
  }, [location1, location2, isChatOpen, isEvidenceOpen]); // Re-run when locations or isChatOpen changes

  // Progress bar animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1)); // Reset to 0 when 100% is reached
    }, 120); // Update every 120ms

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const navigate = useNavigate();

  // If chat is open, render Chat component; otherwise render the payment process UI
  if (isChatOpen) {
    return <Chat setIsChatOpen={setIsChatOpen} isLastStage={isLastStage} />;
  }
  else if (isEvidenceOpen) {
    return <Evidence
      setIsEvidenceOpen={setIsEvidenceOpen}
      isLastStage={isLastStage}
      setIsLastStage={setIsLastStage}
      currentShowOrder={currentShowOrder}
      setCurrentShowOrder={setCurrentShowOrder}
      updateOrders={updateOrders} />;
  }

  return (
    <div className="proworking-container">
      <div className="back-button-container">
        <Link to="/">
          <Button variant="success" className="back-button d-flex">
            <span className="bi bi-caret-left-fill d-flex"></span>
          </Button>
        </Link>
      </div>

      <div
        id="map"
        ref={mapContainerRef}
        style={{ height: "350px", width: "100%" }}
      ></div>

      <div className="status-main-container">
        <div className="status-container">
          <span style={{ fontWeight: "bold" }} className="driver">
            รายละเอียดผู้ให้บริการ
          </span>

          <div className="status-bar-container">
            <div className="status-icon">
              <i className="bi bi-truck"></i>
            </div>
            <div className="status-progress">
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="progress-end"></div>
            </div>
            <button
              className="working-button"
              onClick={() => setIsEvidenceOpen(true)} // Set chat open when clicked
            >
              อัพเดตสถานะ
            </button>
          </div>
        </div>
        <div className="proworking-button-container">
          <button className="working-button">
            ติดต่อลูกค้า
          </button>
          <button
            className="working-button"
            onClick={() => setIsChatOpen(true)} // Set chat open when clicked
          >
            แชทติดต่อ
          </button>
        </div>
        <div className="location-container">
          <div>
            <h5>
              <span className="icon badge bg-success rounded-pill">ต้นทาง</span>
            </h5>
            <span className="text">
              {currentShowOrder.address1}
            </span>
            <h5>
              <span className="icon badge bg-danger rounded-pill">ปลายทาง</span>
            </h5>
            <span className="text">
              {currentShowOrder.address2}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessWorking;
