import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./common/form";
import logo from "../assets/images/logo-2.svg";
import { AuthContext } from "../context/contextProvider";
import Joi from "joi-browser";

import http from "../httpClient.js";

/* Styles */
import "../assets/styles/guest.css";

class Signup extends Form {
    state = {
        data: { name: "", email: "", password: "" },
        errors: {},
        message: "",
    };

    doSubmit = async () => {
        const { setToken, setUser } = this.context;
        const payload = { ...this.state.data };
        try {
            const { data } = await http.post("/signup", payload);
            if (data.message) {
                this.setState({ message: data.message });
            }
            setToken(data.token);
            setUser(data.user);
        } catch (ex) {
            const response = ex.response;
            if (response && response.status === 422) {
                const errors = response.data.errors;
                this.setState({ errors });
            }
        }
    };
    render() {
        const { message } = this.state;
        return (
            <div id="guest">
                <div className="guest-form">
                    <img className="logo-img" src={logo} alt="logo" />
                    <form
                        className="form login-form"
                        onSubmit={this.handleSubmit}
                        action=""
                    >
                        {message && (
                            <div className="alert alert-danger ">{message}</div>
                        )}
                        {this.renderInput("Full Name", "name")}

                        {this.renderInput("Email", "email")}

                        {this.renderInput("Password", "password", "password")}
                        {this.renderButton("Signup", "btn-primary", {
                            width: "100%",
                        })}
                        <Link
                            to="/admin/login"
                            className="text-decoration-none text-end d-block text-black-50 mt-3"
                        >
                            Already have account
                        </Link>
                    </form>
                </div>
            </div>
        );
    }
}
Signup.contextType = AuthContext;

export default Signup;
