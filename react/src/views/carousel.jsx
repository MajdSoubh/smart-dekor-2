import React, { Component } from "react";
import { useRef } from "react";

/* import Project from "./project.jsx";
import projectOne from "../assets/images/project-1.jpg";
import projectTwo from "../assets/images/project-2.jpg";
import projectThree from "../assets/images/project-3.jpg";
import projectFour from "../assets/images/project-4.jpg";
import projectFive from "../assets/images/project-5.jpg";
import projectSechs from "../assets/images/project-6.jpg";
import projectSeven from "../assets/images/project-7.jpg";
import projectEight from "../assets/images/project-8.jpg"; */
import { useEffect } from "react";

const Carousel = ({ projects }) => {
    const carouselRef = useRef();
    const projectRef = useRef();
    const arrowForwardRef = useRef();
    const arrowBackwardRef = useRef();
    let isDragStart = false;
    let isDragging = false;
    useEffect(() => {
        carouselHandleSlide();
    });
    const carouselHandleSlide = () => {
        let prePageX;
        let preCarouselScroll;
        let posDiff;
        const dragStart = (e) => {
            if (isDragStart) return;
            prePageX = e.pageX || e.touches[0].pageX;
            preCarouselScroll = carouselRef.current.scrollLeft;
            carouselRef.current.classList.add("dragging");
            isDragStart = true;
        };
        const dragging = (e) => {
            if (!isDragStart) return;
            isDragging = true;
            e.preventDefault();
            posDiff = (e.pageX || e.touches[0].pageX) - prePageX;
            carouselRef.current.scrollLeft = preCarouselScroll + posDiff;
        };
        const dragStop = () => {
            isDragStart = false;
            carouselRef.current.classList.remove("dragging");
            if (!isDragging) return;
            isDragging = false;
            autoSlide();
            carouselButtonsHide();
        };
        const autoSlide = () => {
            if (preCarouselScroll == carouselRef.current.scrollLeft) return;
            const moveValue = Math.abs(posDiff);
            let project = document.querySelector(".project");
            let margin = parseFloat(getComputedStyle(project).marginRight);
            let projectWidth = project.clientWidth + 2 * margin;
            const projectDiff = projectWidth - moveValue;
            if (parseInt(projectWidth) / 3 < moveValue) {
                carouselRef.current.scrollLeft +=
                    preCarouselScroll < carouselRef.current.scrollLeft
                        ? projectDiff
                        : -projectDiff;
            } else {
                carouselRef.current.scrollLeft +=
                    preCarouselScroll < carouselRef.current.scrollLeft
                        ? -moveValue
                        : moveValue;
            }
        };
        carouselRef.current.addEventListener("mousedown", dragStart);
        carouselRef.current.addEventListener("touchstart", dragStart);
        carouselRef.current.addEventListener("mousemove", dragging);
        carouselRef.current.addEventListener("touchmove", dragging);
        carouselRef.current.addEventListener("mouseup", dragStop);
        carouselRef.current.addEventListener("touchend", dragStop);
        carouselRef.current.addEventListener("mouseleave", dragStop);
    };
    const carouselButtonsHide = () => {
        const carousel = carouselRef.current;
        setTimeout(() => {
            const backward = arrowBackwardRef.current;
            const forward = arrowForwardRef.current;
            carousel.scrollWidth - carousel.clientWidth - 150 <=
            carousel.scrollLeft
                ? forward.classList.add("disabled")
                : forward.classList.remove("disabled");
            carousel.scrollLeft - 150 > 0
                ? backward.classList.remove("disabled")
                : backward.classList.add("disabled");
            isDragStart = false;
        }, 250);
    };
    const handleCarouselChange = (e, dir) => {
        if (isDragStart) return;
        isDragStart = true;
        let item = document.querySelector(".project");
        let width = item.clientWidth;
        let margin = parseInt(getComputedStyle(item).marginRight);
        const value = 2 * margin + width;
        const carousel = carouselRef.current;
        carousel.scrollLeft += dir == "l" ? value : -value;
        carouselButtonsHide();
    };

    return (
        <div className="carousel" id="carousel">
            <div className="projects-title">
                <h2>Check our latest work</h2>
                <p>Celebrating inspiring design & thought leadership.</p>
            </div>

            <div className="projects-group ">
                <div ref={carouselRef} className="carousel">
                    {projects.map((p, ind) =>
                        p.images.map((img) => (
                            <div className="project">
                                <div className="project-image">
                                    <img
                                        className="project-image"
                                        src={img.path}
                                        alt=""
                                    />
                                </div>
                                <div className="project-description">
                                    <h3>{p.title}</h3>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <span
                    onClick={(e) => handleCarouselChange(e, "r")}
                    className="arrow backward disabled"
                    ref={arrowBackwardRef}
                >
                    <i className="bi bi-caret-left-fill"></i>
                </span>
                <span
                    onClick={(e) => handleCarouselChange(e, "l")}
                    className="arrow forward"
                    ref={arrowForwardRef}
                >
                    <i className="bi bi-caret-right-fill"></i>
                </span>
            </div>
        </div>
    );
};

export default Carousel;
