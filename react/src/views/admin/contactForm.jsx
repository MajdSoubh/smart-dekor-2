import React from "react";
import Joi from "joi-browser";
import http from "../../httpClient";

import Form from "../common/form";
import { toast } from "react-toastify";
import { mapDataToState } from "../../utils/utils";

class ContactForm extends Form {
    state = {
        data: {
            email: "",
            phone: "",
            address: "",
            whatsapp: "",
            facebook: "",
            instagram: "",
        },
        errors: {
            email: "",
            phone: "",
            address: "",
            whatsapp: "",
            facebook: "",
            instagram: "",
        },
        isLoading: true,
    };
    async componentDidMount() {
        try {
            const data = { ...this.state.data };
            const { data: resData } = await http.get("/contact");

            this.setState({
                data: mapDataToState(this.state.data, resData),
                isLoading: false,
            });
        } catch (e) {
            console.log(e);
        }
    }
    async doSubmit() {
        try {
            const res = await http.post("/contact/update", this.state.data);
            res.status == 200 ? toast.success("Data Saved Successfully") : null;
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
        const { isLoading } = this.state;
        return (
            <div className=" contact ">
                <h2 className="title text-center mb-4">Contact information</h2>
                {isLoading && (
                    <h4 className="text-center fs-5 fw-light">
                        Please wait until data loading
                    </h4>
                )}
                {!isLoading && (
                    <div className="form-box">
                        <form action="" onSubmit={this.handleSubmit}>
                            {this.renderInput("Email", "email")}
                            {this.renderInput("Phone", "phone")}
                            {this.renderInput("Address", "address")}
                            {this.renderInput(
                                "Whatsapp   exa :   wa.me/number",
                                "whatsapp"
                            )}
                            {this.renderInput(
                                "Facebook   exa :   facebook/page-name",
                                "facebook"
                            )}
                            {this.renderInput(
                                "Instagram   exa :   instagram/page-name",
                                "instagram"
                            )}

                            {this.renderButton("Save", "btn-success", null, {
                                width: "100%",
                                height: "3rem",
                            })}
                        </form>
                    </div>
                )}
            </div>
        );
    }
}

export default ContactForm;
