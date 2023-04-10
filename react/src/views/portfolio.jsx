import React, { Component } from "react";
import Footer from "./footer";
import http from "../httpClient";
class Projects extends Component {
    state = {
        projects: [],
        categories: [],
        selectedCategory: "",
        imageView: false,
        isLoading: true,
    };
    categoryListRef = React.createRef();
    imageViewRef = React.createRef();
    async componentDidMount() {
        const { data: projects } = await http.get("project");
        const { data: categories } = await http.get("category");

        this.setState({ projects, categories, isLoading: false });
    }
    categoryListDisplayToggle = () => {
        this.categoryListRef.current.classList.toggle("expand");
    };
    renderImageView(image) {
        return (
            <div
                className="modal fade image-modal"
                id={"image-show-" + image.id}
            >
                <div className="modal-dialog modal-dialog-centered box">
                    <img className="image rounded" src={image.path} alt="" />
                    <button
                        type="button"
                        className="btn btn-danger modal-close-btn py-1 px-5 fw-bold"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }
    handleImageView = () => {
        const view = !this.state.imageView;
        this.setState({ imageView: view });
        if (!view) return null;
        this.imageViewRef.current.innerText = <h1>helellele</h1>;
    };
    handleSelectCategory = (category) => {
        this.categoryListRef.current
            ? this.categoryListRef.current.classList.remove("expand")
            : "";
        this.setState({ selectedCategory: category });
    };
    getProjects = () => {
        if (!this.state.selectedCategory) return this.state.projects;
        const projects = this.state.projects.filter(
            (project) => project.category.name == this.state.selectedCategory
        );
        return projects;
    };
    render() {
        const projects = this.getProjects();
        return (
            <div className="projects container-fluid">
                <div className="header">
                    <h1 className="title">Portfolio</h1>
                    <p className="description">
                        Whether it’s an office space, retail space, restaurant,
                        or hotel, Abel Design Group offers a trifecta of
                        crossover expertise, service, and agility that has
                        resulted in successful projects and longstanding
                        relationships.
                    </p>
                </div>
                <div className="categories">
                    <div>
                        <ul className="categories-list">
                            <li
                                className={
                                    !this.state.selectedCategory ? "active" : ""
                                }
                                onClick={() => this.handleSelectCategory("")}
                            >
                                All
                            </li>
                            {this.state.categories
                                .slice(0, 2)
                                .map((cat, ind) => (
                                    <React.Fragment key={ind}>
                                        <li>
                                            <span className="gap-line"></span>
                                        </li>
                                        <li
                                            className={
                                                this.state.selectedCategory ===
                                                cat.name
                                                    ? "active"
                                                    : ""
                                            }
                                            onClick={() =>
                                                this.handleSelectCategory(
                                                    cat.name
                                                )
                                            }
                                        >
                                            {cat.name}
                                        </li>
                                    </React.Fragment>
                                ))}
                        </ul>
                    </div>
                    {this.state.categories.length > 3 && (
                        <div className="other-categories">
                            <span
                                onClick={this.categoryListDisplayToggle}
                                className="other-categories-btn "
                            >
                                More Categories
                            </span>
                            <ul
                                ref={this.categoryListRef}
                                className="others-categories-list"
                            >
                                {this.state.categories
                                    .slice(2)
                                    .map((cat, ind) => (
                                        <li
                                            key={ind}
                                            className={
                                                this.state.selectedCategory ===
                                                cat.name
                                                    ? "active"
                                                    : ""
                                            }
                                            onClick={() =>
                                                this.handleSelectCategory(
                                                    cat.name
                                                )
                                            }
                                        >
                                            {cat.name}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="projects-container">
                    {this.state.isLoading && (
                        <h3 className="text-center fs-4 fw-light">
                            Loading projects ...
                        </h3>
                    )}
                    {!projects.length && !this.state.isLoading && (
                        <h3 className="text-center fs-4 fw-light">
                            Sorry no projects found in this category
                        </h3>
                    )}
                    {projects.map((project, ind) => {
                        return (
                            <div key={ind} className="project">
                                <h3 className="title ">{project.title}</h3>
                                <div className="images">
                                    {project.images.map((img, ind) => {
                                        return (
                                            <div key={ind} className="img-box">
                                                <img src={img.path} alt="" />
                                                <div className="img-overlay"></div>
                                                <button
                                                    type="button"
                                                    className="show-btn px-4 py-1  btn btn-danger"
                                                    data-bs-toggle="modal"
                                                    data-bs-target={
                                                        "#image-show-" + img.id
                                                    }
                                                >
                                                    <i className="bi bi-eye-fill"></i>
                                                </button>
                                                {this.renderImageView(img)}
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="description">
                                    {project.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div ref={this.imageViewRef} className="image-view"></div>
            </div>
        );
    }
}

export default Projects;
