import React from "react";
import Joi from "joi-browser";
import http from "../../httpClient";

import Form from "../common/form";
import { toast } from "react-toastify";
import { mapDataToState } from "../../utils/utils";

class ContactForm extends Form {
    state = {
        data: {
            password: "",
            newPassword: "",
        },
        errors: {},
    };
    async doSubmit() {
        try {
            const res = await http.put("/user/update", this.state.data);
            if (res.status == 200) {
                toast.success("Password Changed Successfully");
                this.setState({ errors: {} });
            }
        } catch (ex) {
            const { response } = ex;
            if (response && response.status == 422) {
                const resErrors = response.data.errors;
                const errors = {};
                for (const error in resErrors) {
                    errors[error] = resErrors[error][0];
                }
                this.setState({ errors });
            }
        }
    }
    render() {
        return (
            <div className=" contact ">
                <h2 className="title text-center mb-4">Account information</h2>

                <div className="form-box">
                    <form action="" onSubmit={this.handleSubmit}>
                        {this.renderInput(
                            "Old Password",
                            "password",
                            null,
                            "password"
                        )}
                        {this.renderInput(
                            "New Password",
                            "newPassword",
                            null,
                            "password"
                        )}
                        {this.renderInput(
                            "New Password Repeat",
                            "newPassword_confirmation",
                            null,
                            "password"
                        )}

                        {this.renderButton("Save", "btn-success", null, {
                            width: "100%",
                            height: "3rem",
                        })}
                    </form>
                </div>
            </div>
        );
    }
}

export default ContactForm;
