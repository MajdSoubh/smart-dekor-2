import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "../common/pagination";
import Table from "../common/table";
/* styles */
import "../../assets/styles/table.css";
import http from "../../httpClient";
import { toast } from "react-toastify";
class Categories extends Component {
    state = {
        categories: [],
        sortColumns: [],
        search: "",
        currentPage: 1,
        pageLimit: 10,
        isLoading: true,
    };
    columns = [
        {
            label: "Name",
            path: "name",
        },
        {
            label: "Action",
            key: "action",
            content: (category) => {
                return (
                    <div>
                        {this.renderTableButtons(category)}
                        {this.renderRemove(category)}
                    </div>
                );
            },
        },
    ];
    async componentDidMount() {
        try {
            const { data: resData } = await http.get("/category");
            this.setState({ categories: resData, isLoading: false });
        } catch (ex) {
            console.log(ex);
        }
    }
    renderTableButtons(category) {
        return (
            <div className="table-buttons">
                <button
                    data-bs-toggle="modal"
                    data-bs-target={"#remove-modal-" + category.id}
                    className="btn btn-danger "
                >
                    <i className="bi bi-trash-fill"></i>
                </button>
                <Link
                    className="btn btn-secondary"
                    to={`/admin/category/modify/${category.id}`}
                >
                    <i className="bi bi-pencil-square"></i>
                </Link>
            </div>
        );
    }
    renderRemove(category) {
        return (
            <div className="modal fade" id={"remove-modal-" + category.id}>
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
                            All related projects will be deleted also Are you
                            sure from remove?
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
                                onClick={() => this.handleDelete(category)}
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                            >
                                Remove
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
    handleDelete = async (category) => {
        const originalCategories = this.state.categories;
        const categories = this.state.categories.filter(
            (c) => c.id != category.id
        );
        this.setState({ categories });
        try {
            const res = await http.delete(`/category/${category.id}`);
            if (res.status == 200) {
                toast.success("Category deleted successfully");
            }
        } catch (ex) {
            this.setState({ categories: originalCategories });
        }
    };

    handelPageChange = (currentPage) => {
        this.setState({ currentPage });
    };
    paginate(items, itemsCount, pageSize, selectedPage) {
        const startIndex = (selectedPage - 1) * pageSize;
        return _(items).slice(startIndex).take(pageSize).value();
    }

    getPageData = () => {
        const { pageLimit, currentPage, sortColumns, search, categories } =
            this.state;

        /* searching */
        const searched = categories.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
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
    };

    render() {
        const { count, data: categories } = this.getPageData();

        const { isLoading } = this.state;
        return (
            <div className="admin-categories">
                <div className="m-3 text-center">
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
                            to="/admin/category/add"
                            className="btn btn-primary "
                        >
                            Add Category
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
                                <h4 className="text-center fs-5 fw-light">
                                    You haven't any categories until yet !
                                </h4>
                            )}

                            {count != 0 && (
                                <Table
                                    data={categories}
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

export default Categories;
