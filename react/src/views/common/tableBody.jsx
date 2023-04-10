import _ from "lodash";
import React, { Component } from "react";

class TableBody extends Component {
    renderCell = (item, column) => {
        if (column.content) {
            return column.content(item);
        } else {
            return _.get(item, column.path);
        }
    };

    render() {
        const { data, columns } = this.props;

        return (
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        {columns.map((column) => {
                            return (
                                <td key={column.path || column.key}>
                                    {this.renderCell(item, column)}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        );
    }
}

export default TableBody;
