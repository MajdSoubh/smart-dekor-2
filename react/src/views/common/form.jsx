import React, { Component } from "react";
import _ from "lodash";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import ImagesUploaders from "./imagesUploaders";
import TextArea from "./textArea";

class Form extends Component {
    state = {
        data: {},
        errors: {},
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.schema) {
            const errors = this.validation();
            if (errors) {
                return this.setState({ errors });
            }
        }
        this.doSubmit();
    };

    validation = () => {
        let errors = {};
        const options = { abortEarly: false };
        const validation = Joi.validate(this.state.data, this.schema, options);
        if (!validation.error) return null;
        for (let error of validation.error.details) {
            errors[error.path[0]] = error.message;
        }
        return errors;
    };

    validateProperty = ({ name, value }) => {
        const property = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(property, schema, { abortEarly: false });

        return error ? error.details[0].message : null;
    };
    handleFileChange = ({ target }) => {
        const { name, files: targetFiles } = target;
        const data = { ...this.state.data };
        const files = [...data[name]];
        _.forEach(targetFiles, (f) => {
            files.push(f);
        });
        data[name] = files;
        this.setState({ data });
    };
    handleFileUnSelect = (name, index) => {
        const data = { ...this.state.data };
        const files = [...data[name]];
        files.splice(index, 1);
        data[name] = files;
        this.setState({ data });
    };
    handleChange = ({ target }) => {
        const { name, value } = target;

        const data = { ...this.state.data };

        const errors = { ...this.state.errors };
        data[name] = value;

        if (this.schema) {
            const errorMsg = this.validateProperty(target);

            errorMsg ? (errors[name] = errorMsg) : delete errors[name];
            this.setState({ errors });
        }
        this.setState({ data });
    };
    renderButton = (label, className, type, style, events) => {
        return (
            <button
                {...events}
                style={style}
                type={type}
                className={"btn " + className}
            >
                {label}
            </button>
        );
    };
    renderInput(
        label,
        name,
        hint = null,
        type = "text",
        className = null,
        events
    ) {
        return (
            <Input
                label={label}
                name={name}
                hint={hint}
                type={type}
                {...events}
                className={className}
                onChange={this.handleChange}
                value={this.state.data[name]}
                error={this.state.errors[name]}
            />
        );
    }

    renderImagesUpload(label, name, multiple = true, className = null) {
        return (
            <ImagesUploaders
                onChange={this.handleFileChange}
                onUnSelect={this.handleFileUnSelect}
                name={name}
                label={label}
                multiple={multiple}
                className={className}
                value={this.state.data[name]}
                error={this.state.errors[name]}
            />
        );
    }

    renderTextarea(
        label,
        name,
        rows = 3,
        cols = 3,
        hint = null,
        className = null
    ) {
        return (
            <TextArea
                label={label}
                name={name}
                rows={rows}
                cols={cols}
                className={className}
                onChange={this.handleChange}
                value={this.state.data[name]}
                error={this.state.errors[name]}
            />
        );
    }
    renderSelect(label, name, options = [], className = null) {
        return (
            <Select
                name={name}
                label={label}
                options={options}
                error={this.state.errors[name]}
                onChange={this.handleChange}
                value={this.state.data[name]}
                className={className}
            />
        );
    }
}

export default Form;
