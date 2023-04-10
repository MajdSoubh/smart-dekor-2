import React, { Component, useState, useEffect } from "react";
import { mapDataToState } from "../utils/utils";
import http from "../httpClient";
const About = () => {
    const [header, setHeader] = useState({
        aboutDescription: "",
    });
    const [images, setImages] = useState([]);
    const fetchData = async () => {
        const { data } = await http.get("/header");
        setHeader(mapDataToState(header, data));
        setImages(data.images);
    };
    useEffect(() => {
        fetchData();
    }, []);
    const { aboutDescription } = header;
    return (
        <div className="about container-fluid">
            <div className="header mb-5">
                <h1 className="title">Who We Are</h1>
                <p className="description">{aboutDescription}</p>
            </div>
            <div className="images pb-5">
                {images.map((img) => {
                    return <img src={img.path} />;
                })}
            </div>
        </div>
    );
};

export default About;
