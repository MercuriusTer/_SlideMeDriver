import { useState, useEffect, useRef } from "react";

import "./Navbar.css";
import { Link } from "react-router-dom";

const initTab = 'home'

function Navbar() {
    const [tab, setTab] = useState('')

    useEffect(() => {
        setTab(initTab)
    }, [])

    const homeRef = useRef()
    const listRef = useRef()
    const notiRef = useRef()
    const profileRef = useRef()

    useEffect(() => {
        if (tab === 'home') homeRef.current.click()
        else if (tab === 'list') listRef.current.click()
        else if (tab === 'notification') notiRef.current.click()
        else if (tab === 'profile') profileRef.current.click()
    }, [tab])

    return (
        <div className="Navbar-container">
            <Link to='/home'>
                <button
                    style={{ boxShadow: '0 0 0.25rem gray' }}
                    className={
                        "home " + (tab === "home" ? "btn-onclick" : "btn-unselect")}
                    onClick={() => setTab('home')}
                    ref={homeRef}
                >
                </button>
            </Link>
            <Link to='/list'>
                <button
                    style={{ boxShadow: '0 0 0.25rem gray' }}
                    className={
                        "menu " + (tab === "list" ? "btn-onclick" : "btn-unselect")}
                    onClick={() => setTab('list')}
                    ref={listRef}
                >
                </button>
            </Link>
            <Link to='/notification'>
                <button
                    style={{ boxShadow: '0 0 0.25rem gray' }}
                    className={
                        "noti " + (tab === "notification" ? "btn-onclick" : "btn-unselect")}
                    onClick={() => setTab('notification')}
                    ref={notiRef}
                >
                </button>
            </Link>
            <Link to='/profile'>
                <button
                    style={{ boxShadow: '0 0 0.25rem gray' }}
                    className={
                        "profile " + (tab === "profile" ? "btn-onclick" : "btn-unselect")}
                    onClick={() => setTab('profile')}
                    ref={profileRef}
                >
                </button>
            </Link>
        </div >
    );
}

export default Navbar;
