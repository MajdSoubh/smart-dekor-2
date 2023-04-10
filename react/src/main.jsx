import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import router from "./router";

/* style */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";

import "./assets/styles/index.css";
import "./assets/styles/home.css";
import "./assets/styles/footer.css";
import "./assets/styles/projects.css";
import "./assets/styles/about.css";
import { AuthProvider } from "./context/contextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <ToastContainer />
        <RouterProvider router={router} />
    </AuthProvider>
);
