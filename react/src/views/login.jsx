import React, { Component } from "react";

import Form from "./common/form";
import logo from "../assets/images/logo-2.svg";
import Joi from "joi-browser";
import { AuthContext } from "../context/contextProvider";
import http from "../httpClient";
/* Styles */
import "../assets/styles/guest.css";
class Login extends Form {
    state = {
        data: { email: "", password: "" },
        errors: {},
        message: "",
    };

    doSubmit = async () => {
        const payload = { ...this.state.data };

        const { setToken, setUser } = this.context;
        try {
            const { data } = await http.post("/login", payload);
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
                <div className="   guest-form ">
                    <img className="logo-img" src={logo} alt="logo" />
                    <form
                        className="form login-form"
                        onSubmit={this.handleSubmit}
                        action=""
                    >
                        {message && (
                            <div className="alert alert-danger ">{message}</div>
                        )}
                        {this.renderInput("Email", "email")}
                        {this.renderInput(
                            "Password",
                            "password",
                            null,
                            "password"
                        )}

                        {this.renderButton("Login", "btn-primary", {
                            width: "100%",
                        })}
                    </form>
                </div>
            </div>
        );
    }
}
Login.contextType = AuthContext;

export default Login;
