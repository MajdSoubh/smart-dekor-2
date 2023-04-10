import React from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../assets/images/logo-2.svg";

/* Styles */
import "../assets/styles/nav.css";

const Navbar = ({
    contact: { phone, email, address, whatsapp, instagram, facebook },
}) => {
    const navRef = React.createRef();
    const overlayRef = React.createRef();
    const displayList = () => {
        navRef.current.classList.toggle("expand");
        overlayRef.current.classList.toggle("show");
    };
    return (
        <nav ref={navRef}>
            <div className="header ">
                <div className="list"></div>
                <button
                    className="toggler-btn hover-color-gold"
                    onClick={displayList}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div ref={overlayRef} className="overlay"></div>
            <div className="mobile">
                <div className="logo">
                    <img className="logo-img" src={logo} alt="logo" />
                </div>
                <ul className="m-list">
                    <li className="m-list-item">
                        <NavLink
                            onClick={displayList}
                            className="nav-link hover-color-gold"
                            to="/"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="m-list-item">
                        <NavLink
                            onClick={displayList}
                            className="nav-link hover-color-gold"
                            to="/portfolio"
                        >
                            Portfolio
                        </NavLink>
                    </li>
                    <li className="m-list-item">
                        <NavLink
                            onClick={displayList}
                            className="nav-link hover-color-gold"
                            to="/about"
                        >
                            About Us
                        </NavLink>
                    </li>
                </ul>

                <div className="social-media">
                    {facebook && (
                        <Link
                            target={"_blank"}
                            to={"https://" + facebook}
                            className="facebook hover-color"
                        >
                            <i className="bi bi-facebook fs-4"></i>
                        </Link>
                    )}

                    {instagram && (
                        <Link
                            target={"_blank"}
                            to={"https://" + instagram}
                            className="instgram hover-color"
                        >
                            <i className="bi bi-instagram fs-4"></i>
                        </Link>
                    )}

                    {whatsapp && (
                        <Link
                            target={"_blank"}
                            to={"https://" + whatsapp}
                            className="whatsapp hover-color"
                        >
                            <i className="bi bi-whatsapp fs-4"></i>
                        </Link>
                    )}
                </div>
                <div className="nav-logo-title logo-title">
                    <span className="first">SMART</span>
                    <span className="second"> DEKOR</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
