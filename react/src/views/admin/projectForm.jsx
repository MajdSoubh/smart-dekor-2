import React, { Component } from "react";
import _ from "lodash";
import Form from "../common/form";
import http from "../../httpClient";
import { withParams } from "../../withParams";
import axios from "axios";
import { toast } from "react-toastify";

class ProjectForm extends Form {
    state = {
        data: { title: "", description: "", category: "", images: [] },
        errors: {},

        categories: [],
        isModify: false,
        isLoading: true,
    };

    async componentDidMount() {
        const projectId = this.props.params.id;

        try {
            const res = await http.get("/category");
            this.setState({ categories: res.data });
        } catch (ex) {
            console.log("category : ", ex);
        }
        if (!projectId) return null;
        this.setState({ isModify: true });
        try {
            const res = await http.get(`/project/${projectId}`);
            this.mapDataToView(res.data);
        } catch (ex) {
            console.log("project : ", ex);
        }
    }
    async mapDataToView(resData) {
        const data = {};
        data.category = resData.category_id || "";
        data.description = resData.description || "";
        data.title = resData.title || "";
        data.images = [];
        for (let i = 0; i < resData.images.length; i++) {
            const img = resData.images[i];
            const res = await http.get(`image/${img.title}`, {
                responseType: "blob",
            });
            const file = new File([res.data], img.title);
            data.images.push(file);
        }

        this.setState({ data, isLoading: false });
    }
    sendUpdatedData = async (payload) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        try {
            const res = await http.post(
                `/project/${this.props.params.id}`,
                payload,
                config
            );
            if (res.status == 200) {
                toast.success("Project modified successfully");
                return this.props.navigate("/admin/projects", {
                    replace: true,
                });
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
            } else if (response && response.status == 404) {
                toast.error("Project not exists");
            }
        }
    };
    sendData = async (payload) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        try {
            const res = await http.post("/project", payload, config);
            if (res.status == 200) {
                toast.success("Project created successfully");
                return this.props.navigate("/admin/projects", {
                    replace: true,
                });
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
    doSubmit() {
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
        return this.state.isModify
            ? this.sendUpdatedData(payload)
            : this.sendData(payload);
    }
    render() {
        const { isLoading, isModify } = this.state;
        return (
            <div className=" project-form ">
                <h2 className="title text-center mb-4">
                    {this.state.isModify ? "Modify Project" : "New Project"}
                </h2>
                {isLoading && isModify && (
                    <h4 className="text-center fs-5 fw-light">
                        Please wait until data loading
                    </h4>
                )}
                {(!isModify || !isLoading) && (
                    <div className="form-box">
                        <form action="" onSubmit={this.handleSubmit}>
                            {this.renderInput("Title", "title")}

                            {this.renderTextarea("Description", "description")}
                            {this.renderSelect(
                                "Category",
                                "category",
                                this.state.categories
                            )}
                            {this.renderImagesUpload(
                                "Project images",
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

export default withParams(ProjectForm);
