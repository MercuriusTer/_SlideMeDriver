import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Link, useNavigate } from 'react-router-dom';

import './Home.css';
import 'leaflet/dist/leaflet.css';

import banner from '../../data/banner.jsx';
import adPicture from '../../assets/ad/ad1.png';
import { Form } from 'react-bootstrap';

function MapUpdater({ center }) {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
}

function Home({ saveLocation, isAcceptingJobs, setIsAcceptingJobs }) {
    const navigate = useNavigate();

    const sliderRef = useRef(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(banner);
    }, []);

    const scrollToNextImage = (direction = 'right') => {
        const container = sliderRef.current;
        const imageWidth = container?.firstElementChild?.clientWidth || 0;

        if (container) {
            const currentScroll = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;

            if (direction === 'right' && currentScroll + imageWidth >= maxScroll) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else if (direction === 'left' && currentScroll <= 0) {
                container.scrollTo({ left: maxScroll, behavior: 'smooth' });
            } else {
                const scrollAmount = direction === 'right' ? imageWidth + 10 : -imageWidth;
                container.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth',
                });
            }
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            scrollToNextImage('right');
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const defaultCenter = [13.8556296, 100.5854846]; // Default coordinates

    const getCoordinates = () => {
        if (saveLocation && saveLocation.province && saveLocation.district) {
            return saveLocation.coordinates; // Return district coordinates or default if not found
        }
        return defaultCenter; // Default coordinates if no saveLocation
    };

    const [center, setCenter] = useState(getCoordinates()); // Map

    return (
        <div className="home-container">
            <div className="banner-container">
                <button
                    className="nav-btn"
                    onClick={() => scrollToNextImage('left')}
                >
                    {/* Left Arrow Button */}
                </button>
                <div className="images-container" ref={sliderRef}>
                    {images.map((image, index) => (
                        <img
                            className="image"
                            alt="sliderImage"
                            key={image?.id}
                            src={image?.url}
                        />
                    ))}
                </div>
                <button
                    className="nav-btn"
                    onClick={() => scrollToNextImage('right')}
                >
                    {/* Right Arrow Button */}
                </button>
            </div>

            <div className="maps-container">
                <div
                    className={isAcceptingJobs ? "map-onjob" : "map-disabled"}
                    style={{ border: '4px solid #00A050', width: '90%', borderRadius: '10px', overflow: 'hidden', marginBottom: '5px' }}
                    onClick={() => {
                        if (isAcceptingJobs) {
                            navigate('/home/offer-choice')
                        }
                    }}
                    disabled={!isAcceptingJobs}>
                    <MapContainer
                        center={center}
                        zoom={15}
                        style={{ height: '250px', width: '100%' }}
                        scrollWheelZoom={false}
                        doubleClickZoom={false}
                        zoomControl={false}
                        dragging={false}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <MapUpdater center={center} />
                    </MapContainer>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <h2 style={{ fontWeight: 'bold' }}>เมนูคนขับ</h2>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    <Form style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>ปิดรับงาน</span>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="เปิดรับงาน"
                            className="custom-switch"
                            checked={isAcceptingJobs}
                            onChange={(e) => setIsAcceptingJobs(e.target.checked)} // อัปเดตสถานะ
                        />
                    </Form>
                </div>
            </div>

            <div className="buttons-container">
                <Link to='/home/edit-slide-car'>
                    <button
                        className={!isAcceptingJobs ? "start-button" : "start-button-disabled"} // เปลี่ยนคลาสตามสถานะ
                        disabled={isAcceptingJobs} // ปิดการทำงานหากปิดรับงาน
                    >
                        แก้ไขข้อมูลรถสไลด์ <span className="bi bi-truck-flatbed" style={{ color: "white", marginRight: '8px' }}></span>
                    </button>
                </Link>
                <Link to='/home/edit-distance'>
                    <button
                        className={!isAcceptingJobs ? "start-button" : "start-button-disabled"} // เปลี่ยนคลาสตามสถานะ
                        disabled={isAcceptingJobs} // ปิดการทำงานหากปิดรับงาน
                    >
                        แก้ไขขอบเขตงาน <span className="bi bi-geo-alt-fill" style={{ color: "white", marginRight: '8px' }}></span>
                    </button>
                </Link>
            </div>

            <div className="ad-container">
                <img src={adPicture} alt="Ad" className="ad-image" />
            </div>
        </div>
    );
}

export default Home;