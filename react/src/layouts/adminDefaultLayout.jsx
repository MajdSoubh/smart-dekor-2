import React from "react";
import http from "../httpClient";
import adminLogo from "../assets/images/admin.svg";
import { Navigate, Outlet, NavLink } from "react-router-dom";
import { useAuthContext } from "../context/contextProvider";

/* Styles */
import "../assets/styles/admin.css";
const adminDefaultLayout = () => {
    const { user, token, setToken } = useAuthContext();
    if (!token) {
        return <Navigate to="/admin/login" />;
    }
    const sidebarRef = React.createRef();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const res = await http.get("/logout");
        } catch (ex) {
            console.log(ex);
        }
        setToken(null);
    };

    const toggelSidebar = (e) => {
        sidebarRef.current.classList.toggle("expand");
    };
    return (
        <React.Fragment>
            <div className="admin">
                <aside ref={sidebarRef} className="">
                    <div className="top">
                        <div className="logo">
                            <img src={adminLogo} alt="" />
                            <h2>Admin</h2>
                        </div>
                        <div onClick={toggelSidebar} className="close-btn">
                            <i className="bi bi-x"></i>
                        </div>
                    </div>
                    <div className="sidebar">
                        <NavLink
                            onClick={toggelSidebar}
                            className="list-item "
                            to="/admin/header"
                        >
                            <i className="bi bi-menu-button-wide fs-3"></i>
                            <h3>Header</h3>
                        </NavLink>
                        <NavLink
                            onClick={toggelSidebar}
                            className="list-item"
                            to="/admin/projects"
                        >
                            <i className="bi bi-grid-fill"></i>
                            <h3>Projects</h3>
                        </NavLink>
                        <NavLink
                            onClick={toggelSidebar}
                            className="list-item"
                            to="/admin/categories"
                        >
                            <i className="bi bi-bookmark fs-4"></i>
                            <h3>Categories</h3>
                        </NavLink>

                        <NavLink
                            onClick={toggelSidebar}
                            className="list-item"
                            to="/admin/contact"
                        >
                            <i className="bi bi-person-fill fs-3"></i>
                            <h3>Contact</h3>
                        </NavLink>
                        <a onClick={handleLogout} className="list-item" href="">
                            <i className="bi bi-box-arrow-right fs-3"></i>
                            <h3>Logout</h3>
                        </a>
                    </div>
                </aside>
                <nav className="shadow-sm">
                    <ul className="nav-list">
                        <li
                            className="list-item expand-btn"
                            onClick={toggelSidebar}
                        >
                            <i className="bi bi-list fs-1"></i>
                        </li>

                        <li onClick={handleLogout} className="list-item">
                            <i className="bi bi-box-arrow-right fs-4"></i>
                        </li>
                    </ul>
                </nav>
                <main>
                    <div className="container">
                        <Outlet />
                    </div>
                </main>
            </div>
        </React.Fragment>
    );
};

export default adminDefaultLayout;
