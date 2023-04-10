import React from "react";
import Form from "../common/form";
import http from "../../httpClient";
import _ from "lodash";
import { toast } from "react-toastify";
import { mapDataToState } from "../../utils/utils";

class HeaderForm extends Form {
    state = {
        data: {
            introTitle: "",
            introDescription: "",
            outroTitle: "",
            outroDescription: "",
            portfolioDescription: "",
            aboutDescription: "",
            images: [],
        },
        errors: {},
        isLoading: true,
    };

    async componentDidMount() {
        try {
            const res = await http.get("/header");
            this.mapDataToView(res.data);
        } catch (ex) {
            console.log("intro : ", ex);
        }
    }

    sendData = async (payload) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        try {
            const res = await http.post("/header/update", payload, config);
            if (res.status == 200) {
                toast.success("Headers updated successfully");
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
    };
    async mapDataToView(resData) {
        const data = mapDataToState(this.state.data, resData);
        data.images = [];
        if (resData.images) {
            for (let i = 0; i < resData.images.length; i++) {
                const img = resData.images[i];
                try {
                    const res = await http.get(`image/${img.title}`, {
                        responseType: "blob",
                    });
                    const file = new File([res.data], img.title);
                    data.images.push(file);
                } catch (ex) {
                    console.log(ex);
                }
            }
        }
        this.setState({ data, isLoading: false });
    }
    async doSubmit() {
        const payload = new FormData();
        for (const key in this.state.data) {
            if (key == "images") {
                _.forEach(this.state.data.images, (img) => {
                    payload.append("images[]", img);
                });
                continue;
            }
            payload.append(key, this.state.data[key]);
        }
        return this.sendData(payload);
    }
    render() {
        const { isLoading } = this.state;
        return (
            <div className=" header-form ">
                <h2 className="title text-center mb-4">Headers information</h2>
                {isLoading && (
                    <h4 className="text-center fs-5 fw-light">
                        Please wait until data loading
                    </h4>
                )}
                {!isLoading && (
                    <div className="form-box">
                        <form action="" onSubmit={this.handleSubmit}>
                            {this.renderInput("Intro title", "introTitle")}

                            {this.renderTextarea(
                                "Intro description",
                                "introDescription"
                            )}
                            {this.renderInput("Outro title", "outroTitle")}

                            {this.renderTextarea(
                                "Outro description",
                                "outroDescription"
                            )}
                            {this.renderTextarea(
                                "Portfolio description",
                                "portfolioDescription"
                            )}

                            {this.renderTextarea(
                                "About description",
                                "aboutDescription"
                            )}
                            {this.renderImagesUpload(
                                "About images",
                                "images",
                                true
                            )}
                            {this.renderButton(
                                "Save",
                                "btn-success",
                                "submit",
                                {
                                    width: "100%",
                                }
                            )}
                        </form>
                    </div>
                )}
            </div>
        );
    }
}

export default HeaderForm;
