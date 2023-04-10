import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/contextProvider";

const adminGuestLayout = () => {
    const { user, token } = useAuthContext();
    if (token) {
        return <Navigate to="/admin" />;
    }

    return <Outlet />;
};

export default adminGuestLayout;
