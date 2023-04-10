import React, { Component } from "react";
import _ from "lodash";

class Pagination extends Component {
    render() {
        const { pageLimit, itemCount, currentPage, onPageChange } = this.props;
        const pagesCount = Math.ceil(itemCount / pageLimit);

        if (pagesCount === 1) return null;
        const pages = _.range(1, pagesCount + 1);
        return (
            <ul className="pagination">
                {pages.map((page) => {
                    return (
                        <li
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={
                                page === currentPage
                                    ? "page-item active"
                                    : "page-item"
                            }
                        >
                            <a className="page-link" href="#">
                                {page}
                            </a>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default Pagination;
