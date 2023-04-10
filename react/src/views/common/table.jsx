import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
const Table = ({ onSort, data, columns, sortColumns }) => {
    return (
        <table className="table table-hover">
            <TableHeader
                columns={columns}
                onSort={onSort}
                sortColumns={sortColumns}
            />
            <TableBody data={data} columns={columns} />
        </table>
    );
};

export default Table;
