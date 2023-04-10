import React from "react";
const Select = ({ name, label, options, className, error, ...rest }) => {
    return (
        <div className="form-group mb-3">
            <label htmlFor={"select-" + name} className="form-label">
                {label}
            </label>
            <select
                id={"select-" + name}
                className={className || "form-select form-select-sm py-3"}
                name={name}
                {...rest}
            >
                <option>Open this select menu</option>
                {options.map((op) => {
                    return (
                        <option key={op.id} value={op.id}>
                            {op.name}
                        </option>
                    );
                })}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Select;
