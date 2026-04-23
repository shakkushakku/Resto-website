import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (role && currentUser.role !== role) {
        // If trying to access chef page as customer, or vice versa
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
