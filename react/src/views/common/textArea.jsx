import React from "react";

const TextArea = ({ label, error, hint, name, className, ...rest }) => {
    return (
        <div className="form-group mb-5">
            <label htmlFor={name} className="mb-2 px-1">
                {label}
            </label>
            <textarea
                className={className || "form-control py-3"}
                id={name}
                name={name}
                {...rest}
            ></textarea>
            {hint && (
                <span
                    style={{ fontSize: ".89rem" }}
                    className="hint text-black-50 mt-2 d-block "
                >
                    {hint}
                </span>
            )}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default TextArea;
