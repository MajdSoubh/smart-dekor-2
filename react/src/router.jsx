import { createBrowserRouter, Navigate } from "react-router-dom";
/* layouts  */
import DefaultLayout from "./layouts/defaultLayout";
import AdminDefaultLayout from "./layouts/adminDefaultLayout";
import AdminGuestLayout from "./layouts/adminGuestLayout";
/* home components */
import Login from "./views/login";
import Home from "./views/home";
import NotFound from "./views/notfound";
import Signup from "./views/signup";
import Portfolio from "./views/portfolio";
import About from "./views/about";
/* admin components */
import AdminProjects from "./views/admin/projects";
import Categories from "./views/admin/categories";
import ProjectForm from "./views/admin/projectForm";
import CategoryForm from "./views/admin/categoryForm";
import HeaderForm from "./views/admin/headerForm";
import ContactForm from "./views/admin/contactForm";
import AccountForm from "./views/admin/AccountForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/portfolio", element: <Portfolio /> },
            { path: "/about", element: <About /> },
        ],
    },
    {
        path: "/admin",
        element: <AdminDefaultLayout />,
        children: [
            { path: "/admin", element: <Navigate to="/admin/header" /> },
            {
                path: "/admin/account",
                element: <AccountForm />,
            },
            { path: "/admin/contact", element: <ContactForm /> },
            { path: "/admin/projects", element: <AdminProjects /> },
            { path: "/admin/project/add", element: <ProjectForm /> },
            { path: "/admin/project/modify/:id", element: <ProjectForm /> },
            { path: "/admin/categories", element: <Categories /> },
            { path: "/admin/category/add", element: <CategoryForm /> },
            { path: "/admin/category/modify/:id", element: <CategoryForm /> },
            { path: "/admin/header", element: <HeaderForm /> },
        ],
    },
    {
        path: "/admin",
        element: <AdminGuestLayout />,
        children: [
            { path: "/admin/login", element: <Login /> },
            { path: "/admin/signup", element: <Signup /> },
        ],
    },
    { path: "*", element: <NotFound /> },
]);

export default router;
