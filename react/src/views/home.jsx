import React, { Component } from "react";
import { mapDataToState } from "../utils/utils";
import http from "../httpClient";
import Carousel from "./carousel";

/* images */
import logo from "../assets/images/logo.svg";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
    const [header, setHeader] = useState({
        introTitle: "",
        introDescription: "",
        outroTitle: "",
        outroDescription: "",
    });
    const [projects, setProjects] = useState([
        { title: "", description: "", images: [] },
    ]);
    const fetchData = async () => {
        const { data: resHeader } = await http.get("/header");
        setHeader(mapDataToState(header, resHeader));
        const { data: resProjects } = await http.get("/project");
        setProjects(mapDataToState(projects, resProjects));
    };
    useEffect(() => {
        fetchData();
    }, []);
    const { introTitle, introDescription, outroTitle, outroDescription } =
        header;
    return (
        <section id="home" className="home">
            <div className=" home-header">
                <div className="home-logo">
                    <div className="home-item logo-title">
                        <span className="first">SMART</span>
                        <span className="second"> DEKOR</span>
                    </div>
                    <div className="home-item">
                        <img className="logo-img" src={logo} alt="logo" />
                    </div>
                </div>
            </div>

            <div className="container">
                {/* Intro */}

                {header.introTitle && header.introDescription && (
                    <React.Fragment>
                        <div className="intro ">
                            <div className="intro-title ">
                                <h2>Achtitecture</h2>
                                <p>{introTitle}</p>
                            </div>
                            <div className="intro-description ">
                                <p>{introDescription}</p>
                            </div>
                        </div>
                        <hr className="horizontal-line" />
                    </React.Fragment>
                )}
                {/* Projects */}
                {projects.length != 0 && <Carousel projects={projects} />}
                {projects.length != 0 &&
                    (header.outroTitle || header.outroDescription) && (
                        <hr className="horizontal-line" />
                    )}
                {/* Outro */}
                {header.outroTitle && header.outroDescription && (
                    <div className="outro" id="about">
                        <h2>{outroTitle}</h2>
                        <p>{outroDescription}</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Home;
