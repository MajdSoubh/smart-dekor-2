import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { Link } from "react-router-dom";
import http from "../httpClient";

const Footer = ({
    contact: { phone, email, address, whatsapp, instagram, facebook },
}) => {
    return (
        <footer id="footer">
            <div className="footer-container container">
                <div className="box-1">
                    <div className="logo-title">
                        <span className="first">SMART</span>
                        <span className="second"> DEKOR</span>
                    </div>
                    <ul className="footer-navgation">
                        <Link to="/">
                            <li>Home</li>
                        </Link>
                        <Link to="/portfolio">
                            <li>Portfolio</li>
                        </Link>
                        <Link to="/about">
                            <li>About us</li>
                        </Link>
                    </ul>
                </div>

                <div className="box-2">
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
                    <div className="copyright">
                        Copyright &#169; {new Date().getFullYear()}
                    </div>
                </div>
                <div className="box-3">
                    {address && (
                        <div className="address list-item">
                            <i className="bi bi-geo-alt-fill"></i>
                            {address}
                        </div>
                    )}
                    {phone && (
                        <div className="phone list-item">
                            <i className="bi bi-telephone-fill"></i>
                            {phone}
                        </div>
                    )}
                    {email && (
                        <div className="email list-item">
                            <i className="bi bi-envelope-fill"></i>
                            {email}
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
