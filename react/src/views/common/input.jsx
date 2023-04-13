import React from "react";

const Input = ({ label, name, error, hint, className, ...rest }) => {
    return (
        <div className="form-group mb-3">
            <label htmlFor={name} className="mb-2 px-1">
                {label}
            </label>
            <input
                name={name}
                id={name}
                {...rest}
                className={className || "form-control py-2"}
            ></input>
            {hint && (
                <span
                    style={{ fontSize: ".89rem" }}
                    className="hint text-black-50 mt-2 d-block "
                >
                    {hint}
                </span>
            )}
            {error && <div className="alert alert-danger ">{error}</div>}
        </div>
    );
};

export default Input;
