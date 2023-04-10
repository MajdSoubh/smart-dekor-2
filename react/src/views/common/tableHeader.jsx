import React, { Component } from "react";

class TableHeader extends Component {
    raiseSort(path) {
        const { onSort, sortColumns } = this.props;
        const sort = [...sortColumns];

        let ind = sort.findIndex((item) => item.name === path);
        if (ind === -1) {
            sort.push({ name: path, order: "asc" });
        } else {
            const order = sort[ind].order === "asc" ? "desc" : "asc";
            if (order === "asc") {
                /* delete sorting if the previous sort is ascending */
                sort.splice(ind, 1);
            } else {
                sort[ind].order = order;
            }
        }
        onSort(sort);
    }

    renderSortIcon(path) {
        const { sortColumns } = this.props;
        const sortItem = sortColumns.find((s) => s.name === path);
        let icon = null;
        if (sortItem) {
            icon =
                sortItem.order === "asc" ? (
                    <i className="bi bi-sort-down"></i>
                ) : (
                    <i className="bi bi-sort-up"></i>
                );
        }
        return icon;
    }
    render() {
        const { columns } = this.props;
        return (
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column.path || column.key}
                            onClick={() => this.raiseSort(column.path)}
                        >
                            {column.label} {this.renderSortIcon(column.path)}
                        </th>
                    ))}
                </tr>
            </thead>
        );
    }
}

export default TableHeader;
