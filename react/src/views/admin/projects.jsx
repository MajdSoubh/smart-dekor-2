import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "../common/pagination";
import Table from "../common/table";
/* styles */
import "../../assets/styles/table.css";
import http from "../../httpClient";
import { toast } from "react-toastify";
class ProjectTable extends Component {
    state = {
        projects: [],
        sortColumns: [],
        search: "",
        currentPage: 1,
        pageLimit: 8,
        isLoading: true,
    };
    columns = [
        {
            label: "Title",
            path: "title",
        },
        { label: "Description", path: "description" },
        { label: "Category", path: "category.name" },

        {
            label: "Action",
            key: "action",
            content: (project) => {
                return (
                    <div>
                        {this.renderTableButtons(project)}
                        {this.renderRemove(project)}
                        {this.renderImageList(project)}
                    </div>
                );
            },
        },
    ];
    async componentDidMount() {
        try {
            const { data: resData } = await http.get("/project");
            this.setState({ projects: resData, isLoading: false });
        } catch (ex) {
            console.log(ex);
        }
    }
    renderTableButtons(project) {
        return (
            <div className="table-buttons">
                <button
                    data-bs-toggle="modal"
                    data-bs-target={"#remove-modal-" + project.id}
                    className="btn btn-danger "
                >
                    <i className="bi bi-trash-fill"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target={"#images-list-modal-" + project.id}
                >
                    <i className="bi bi-eye-fill"></i>
                </button>
                <Link
                    className="btn btn-secondary"
                    to={`/admin/project/modify/${project.id}`}
                >
                    <i className="bi bi-pencil-square"></i>
                </Link>
            </div>
        );
    }
    renderRemove(project) {
        return (
            <div className="modal fade" id={"remove-modal-" + project.id}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Alert</h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            Are you sure from remove?
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => this.handleDelete(project)}
                                type="button"
                                className="btn btn-danger"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    renderImageList(project) {
        return (
            <div
                className="modal fade image-modal"
                id={"images-list-modal-" + project.id}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Images</h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div
                                className="images-box"
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    width: "100%",
                                }}
                            >
                                {project.images.map((img, ind) => (
                                    <img key={ind} src={img.path} style={{}} />
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleChange = ({ currentTarget: input }) => {
        const { name, value } = input;

        this.setState({ [name]: value });
    };
    handleSort = (sortColumns) => {
        this.setState({ sortColumns });
    };
    handleDelete = (project) => {
        const orginalProjects = this.state.projects;
        const projects = this.state.projects.filter((m) => m.id !== project.id);
        this.setState({ projects });
        try {
            const res = http.delete(`project/${project.id}`);
            if (res.status == 200) {
                toast.success("Project deleted successfully");
            }
        } catch (ex) {
            this.setState({ orginalProjects });
        }
    };
    handelPageChange = (currentPage) => {
        this.setState({ currentPage });
    };
    paginate(items, itemsCount, pageSize, selectedPage) {
        const startIndex = (selectedPage - 1) * pageSize;
        return _(items).slice(startIndex).take(pageSize).value();
    }

    getPageData() {
        const { pageLimit, currentPage, sortColumns, search, projects } =
            this.state;

        /* searching */
        const searched = projects.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
        );
        /* sorting */
        const sorted = _.orderBy(
            searched,
            _.map(sortColumns, "name"),
            _.map(sortColumns, "order")
        );
        /* pagination */
        const data = this.paginate(
            sorted,
            sorted.length,
            pageLimit,
            currentPage
        );

        const count = searched.length;
        return { count, data };
    }

    render() {
        const { isLoading } = this.state;
        const { count, data: projects } = this.getPageData();
        return (
            <div className="admin-projects">
                <div className="  m-3 text-center">
                    <div className="table-utility mb-3">
                        <input
                            type="text"
                            value={this.state.search}
                            onChange={this.handleChange}
                            name="search"
                            className="form-control table-search"
                            placeholder="Search"
                        />
                        <Link
                            to="/admin/project/add"
                            className="btn btn-primary "
                        >
                            Add Project
                        </Link>
                    </div>
                    {isLoading && (
                        <h4 className="text-center fs-5 fw-light">
                            Please wait until data loading
                        </h4>
                    )}
                    {!isLoading && (
                        <React.Fragment>
                            {count == 0 && (
                                <h4
                                    styles={{ textAlign: "center" }}
                                    className="mt-4"
                                >
                                    Sorry no data found
                                </h4>
                            )}
                            {count != 0 && (
                                <Table
                                    data={projects}
                                    columns={this.columns}
                                    onSort={this.handleSort}
                                    sortColumns={this.state.sortColumns}
                                />
                            )}
                            <Pagination
                                onPageChange={this.handelPageChange}
                                currentPage={this.state.currentPage}
                                pageLimit={this.state.pageLimit}
                                itemCount={count}
                            />
                        </React.Fragment>
                    )}
                </div>
            </div>
        );
    }
}
export default ProjectTable;
