import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../views/footer";
import Navbar from "../views/navbar";
import http from "../httpClient";
import { mapDataToState } from "../utils/utils";
class defaultLayout extends Component {
    state = {
        contact: {
            phone: "",
            email: "",
            facebook: "",
            instagram: "",
            whatsapp: "",
            address: "",
        },
        header: {
            introTitle: "",
            introDescription: "",
            outroTitle: "",
            outroDescription: "",
            portfolioDescription: "",
        },
    };
    async componentDidMount() {
        let { data: contact } = await http.get("/contact");
        this.setState({ contact: mapDataToState(this.state.contact, contact) });
    }

    render() {
        return (
            <React.Fragment>
                <Navbar contact={this.state.contact} />
                <Outlet />
                <Footer contact={this.state.contact} />
            </React.Fragment>
        );
    }
}

export default defaultLayout;
